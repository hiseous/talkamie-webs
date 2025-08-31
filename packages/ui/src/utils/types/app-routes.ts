
export type accountAppRouteSubpath = 'edit' | 'reviews' | 'verification';
export type settingsAppRouteSubpath = | 'purchase' | 'history' | 'password'
    | 'privacy' | 'availability' | 'schedule' | 'preferences'
    // | 'location'
    // | 'subscription' | 'plans'
    | 'finance' | 'manage' | 'profile' | accountAppRouteSubpath
    | `transaction/${string}`
;