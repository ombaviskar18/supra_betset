module SupraRoulette {
    use std::signer;
    use std::error;
    use std::vector;
    use std::string::{Self, String};
    use aptos_framework::coin::{Self, Coin};
    use aptos_framework::timestamp;
    use aptos_framework::account;
    use aptos_framework::event::{Self, EventHandle};
    use supra_framework::oracle;
    use supra_framework::supra_coin::SupraCoin;

    /// Error codes
    const EBETTING_NOT_ENABLED: u64 = 1;
    const EBET_ALREADY_EXISTS: u64 = 2;
    const EBET_NOT_FOUND: u64 = 3;
    const EBET_ALREADY_RESOLVED: u64 = 4;
    const EINVALID_BET_AMOUNT: u64 = 5;
    const EINSUFFICIENT_BALANCE: u64 = 6;
    const EINVALID_DURATION: u64 = 7;
    const EBET_NOT_MATURE: u64 = 8;
    const ENOT_ADMIN: u64 = 9;
    const EINVALID_PAIR: u64 = 10;
    const EINSUFFICIENT_HOUSE_BALANCE: u64 = 11;
    const EINVALID_ODDS: u64 = 12;
    const EINVALID_PRICE_FEED: u64 = 13;

    struct Bet has key {
        user: address,
        amount: u64,
        direction: bool, // true = UP, false = DOWN
        initial_price: u64,
        timestamp: u64,
        duration: u64, // Duration in minutes
        pair: vector<u8>, // Trading pair (e.g., "BTC/USD")
        resolved: bool,
        payout: u64,
        odds: u64, // Multiplier in basis points (e.g., 20000 = 2x)
        final_price: u64,
        result: bool, // true = won, false = lost
    }

    struct BettingConfig has key {
        enabled: bool,
        min_bet: u64,
        max_bet: u64,
        min_duration: u64,
        max_duration: u64,
        house_balance: Coin<SupraCoin>,
        admin: address,
        supported_pairs: vector<vector<u8>>,
        total_bets: u64,
        total_payouts: u64,
        max_house_exposure: u64,
        current_exposure: u64,
        default_odds: u64,
        fee_percentage: u64, // In basis points (e.g., 250 = 2.5%)
        bet_events: EventHandle<BetEvent>,
        resolution_events: EventHandle<ResolutionEvent>,
    }

    struct UserStats has key {
        total_bets: u64,
        wins: u64,
        losses: u64,
        total_wagered: u64,
        total_won: u64,
        best_win: u64,
        worst_loss: u64,
        longest_win_streak: u64,
        current_win_streak: u64,
        last_bet_timestamp: u64,
        favorite_pair: vector<u8>,
        pair_stats: vector<PairStat>,
    }

    struct PairStat has store {
        pair: vector<u8>,
        bets: u64,
        wins: u64,
        total_wagered: u64,
    }

    struct BetEvent has drop, store {
        user: address,
        amount: u64,
        direction: bool,
        pair: vector<u8>,
        timestamp: u64,
        duration: u64,
        odds: u64,
    }

    struct ResolutionEvent has drop, store {
        user: address,
        won: bool,
        payout: u64,
        initial_price: u64,
        final_price: u64,
        timestamp: u64,
    }

    public fun initialize(admin: &signer) {
        let admin_addr = signer::address_of(admin);
        assert!(admin_addr == @supraRouletteAddress, error::permission_denied(ENOT_ADMIN));

        let supported_pairs = vector::empty<vector<u8>>();
        vector::push_back(&mut supported_pairs, b"BTC/USD");
        vector::push_back(&mut supported_pairs, b"ETH/USD");
        vector::push_back(&mut supported_pairs, b"SOL/USD");
        vector::push_back(&mut supported_pairs, b"BNB/USD");
        vector::push_back(&mut supported_pairs, b"ADA/USD");
        vector::push_back(&mut supported_pairs, b"XRP/USD");

        let config = BettingConfig {
            enabled: true,
            min_bet: 1000000, // 1 SUPRA
            max_bet: 1000000000, // 1000 SUPRA
            min_duration: 1, // 1 minute
            max_duration: 1440, // 24 hours
            house_balance: coin::zero<SupraCoin>(),
            admin: admin_addr,
            supported_pairs,
            total_bets: 0,
            total_payouts: 0,
            max_house_exposure: 10000000000, // 10,000 SUPRA
            current_exposure: 0,
            default_odds: 19500, // 1.95x
            fee_percentage: 250, // 2.5%
            bet_events: account::new_event_handle<BetEvent>(admin),
            resolution_events: account::new_event_handle<ResolutionEvent>(admin),
        };
        move_to(admin, config);
    }

    public entry fun place_bet(
        user: &signer,
        amount: u64,
        direction: bool,
        duration: u64,
        pair: vector<u8>
    ) acquires BettingConfig, UserStats {
        let config = borrow_global_mut<BettingConfig>(@supraRouletteAddress);
        let user_addr = signer::address_of(user);

        // Validate bet parameters
        assert!(config.enabled, error::invalid_state(EBETTING_NOT_ENABLED));
        assert!(amount >= config.min_bet && amount <= config.max_bet, error::invalid_argument(EINVALID_BET_AMOUNT));
        assert!(duration >= config.min_duration && duration <= config.max_duration, error::invalid_argument(EINVALID_DURATION));
        assert!(vector::contains(&config.supported_pairs, &pair), error::invalid_argument(EINVALID_PAIR));
        
        // Check exposure limits
        let potential_payout = (amount * config.default_odds) / 10000;
        assert!(config.current_exposure + potential_payout <= config.max_house_exposure, 
            error::invalid_state(EINSUFFICIENT_HOUSE_BALANCE));
        
        // Check if user has sufficient balance
        assert!(coin::balance<SupraCoin>(user_addr) >= amount, error::invalid_state(EINSUFFICIENT_BALANCE));

        // Get current price from oracle
        let initial_price = oracle::get_price(&pair);
        assert!(initial_price > 0, error::invalid_state(EINVALID_PRICE_FEED));
        
        // Create and store bet
        let bet = Bet {
            user: user_addr,
            amount,
            direction,
            initial_price,
            timestamp: timestamp::now_seconds(),
            duration,
            pair: pair,
            resolved: false,
            payout: 0,
            odds: config.default_odds,
            final_price: 0,
            result: false,
        };

        // Transfer bet amount to house
        let payment = coin::withdraw<SupraCoin>(user, amount);
        coin::merge(&mut config.house_balance, payment);
        config.total_bets = config.total_bets + 1;
        config.current_exposure = config.current_exposure + potential_payout;

        // Update user stats
        if (!exists<UserStats>(user_addr)) {
            move_to(user, UserStats {
                total_bets: 0,
                wins: 0,
                losses: 0,
                total_wagered: 0,
                total_won: 0,
                best_win: 0,
                worst_loss: 0,
                longest_win_streak: 0,
                current_win_streak: 0,
                last_bet_timestamp: 0,
                favorite_pair: pair,
                pair_stats: vector::empty<PairStat>(),
            });
        };

        let stats = borrow_global_mut<UserStats>(user_addr);
        stats.total_bets = stats.total_bets + 1;
        stats.total_wagered = stats.total_wagered + amount;
        stats.last_bet_timestamp = timestamp::now_seconds();

        // Update pair statistics
        update_pair_stats(stats, &pair, amount);

        // Emit bet event
        event::emit_event(&mut config.bet_events, BetEvent {
            user: user_addr,
            amount,
            direction,
            pair: pair,
            timestamp: timestamp::now_seconds(),
            duration,
            odds: config.default_odds,
        });

        move_to(user, bet);
    }

    fun update_pair_stats(stats: &mut UserStats, pair: &vector<u8>, amount: u64) {
        let found = false;
        let len = vector::length(&stats.pair_stats);
        let i = 0;
        while (i < len) {
            let stat = vector::borrow_mut(&mut stats.pair_stats, i);
            if (stat.pair == *pair) {
                stat.bets = stat.bets + 1;
                stat.total_wagered = stat.total_wagered + amount;
                found = true;
                break
            };
            i = i + 1;
        };

        if (!found) {
            vector::push_back(&mut stats.pair_stats, PairStat {
                pair: *pair,
                bets: 1,
                wins: 0,
                total_wagered: amount,
            });
        };
    }

    public entry fun resolve_bet(user: &signer) acquires Bet, BettingConfig, UserStats {
        let user_addr = signer::address_of(user);
        assert!(exists<Bet>(user_addr), error::not_found(EBET_NOT_FOUND));

        let bet = borrow_global_mut<Bet>(user_addr);
        assert!(!bet.resolved, error::invalid_state(EBET_ALREADY_RESOLVED));

        // Check if bet duration has elapsed
        let current_time = timestamp::now_seconds();
        assert!(current_time >= bet.timestamp + (bet.duration * 60), error::invalid_state(EBET_NOT_MATURE));

        let current_price = oracle::get_price(&bet.pair);
        assert!(current_price > 0, error::invalid_state(EINVALID_PRICE_FEED));

        let config = borrow_global_mut<BettingConfig>(@supraRouletteAddress);
        let stats = borrow_global_mut<UserStats>(user_addr);

        // Determine if bet won
        let won = if (bet.direction) {
            current_price > bet.initial_price
        } else {
            current_price < bet.initial_price
        };

        bet.final_price = current_price;
        bet.result = won;

        // Calculate and pay winnings if bet won
        if (won) {
            let payout = (bet.amount * bet.odds) / 10000;
            let fee = (payout * config.fee_percentage) / 10000;
            let net_payout = payout - fee;

            let payment = coin::extract(&mut config.house_balance, net_payout);
            coin::deposit(user_addr, payment);
            
            bet.payout = net_payout;
            config.total_payouts = config.total_payouts + net_payout;
            config.current_exposure = config.current_exposure - payout;

            stats.wins = stats.wins + 1;
            stats.total_won = stats.total_won + net_payout;
            stats.current_win_streak = stats.current_win_streak + 1;
            
            if (net_payout > stats.best_win) {
                stats.best_win = net_payout;
            };
            if (stats.current_win_streak > stats.longest_win_streak) {
                stats.longest_win_streak = stats.current_win_streak;
            };

            // Update pair stats
            update_pair_win_stats(stats, &bet.pair);
        } else {
            stats.losses = stats.losses + 1;
            stats.current_win_streak = 0;
            if (bet.amount > stats.worst_loss) {
                stats.worst_loss = bet.amount;
            };
        };

        // Emit resolution event
        event::emit_event(&mut config.resolution_events, ResolutionEvent {
            user: user_addr,
            won,
            payout: bet.payout,
            initial_price: bet.initial_price,
            final_price: current_price,
            timestamp: current_time,
        });

        bet.resolved = true;
    }

    fun update_pair_win_stats(stats: &mut UserStats, pair: &vector<u8>) {
        let len = vector::length(&stats.pair_stats);
        let i = 0;
        while (i < len) {
            let stat = vector::borrow_mut(&mut stats.pair_stats, i);
            if (stat.pair == *pair) {
                stat.wins = stat.wins + 1;
                break
            };
            i = i + 1;
        };
    }

    public fun get_user_stats(user_addr: address): (u64, u64, u64, u64, u64, u64, u64, u64, vector<u8>) acquires UserStats {
        if (!exists<UserStats>(user_addr)) {
            return (0, 0, 0, 0, 0, 0, 0, 0, vector::empty())
        };
        let stats = borrow_global<UserStats>(user_addr);
        (
            stats.total_bets,
            stats.wins,
            stats.losses,
            stats.total_wagered,
            stats.total_won,
            stats.best_win,
            stats.worst_loss,
            stats.longest_win_streak,
            stats.favorite_pair
        )
    }

    public entry fun update_config(
        admin: &signer,
        enabled: bool,
        min_bet: u64,
        max_bet: u64,
        min_duration: u64,
        max_duration: u64,
        max_exposure: u64,
        default_odds: u64,
        fee_percentage: u64
    ) acquires BettingConfig {
        let admin_addr = signer::address_of(admin);
        let config = borrow_global_mut<BettingConfig>(@supraRouletteAddress);
        assert!(admin_addr == config.admin, error::permission_denied(ENOT_ADMIN));
        assert!(default_odds >= 10000, error::invalid_argument(EINVALID_ODDS));
        assert!(fee_percentage <= 1000, error::invalid_argument(EINVALID_ODDS)); // Max 10% fee

        config.enabled = enabled;
        config.min_bet = min_bet;
        config.max_bet = max_bet;
        config.min_duration = min_duration;
        config.max_duration = max_duration;
        config.max_house_exposure = max_exposure;
        config.default_odds = default_odds;
        config.fee_percentage = fee_percentage;
    }
}
