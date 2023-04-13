export interface AuthContextInterface<T> {
    user: T | null;
    token: string;
    dispatch: (data: authAction) => any
}

export type authAction = 
| { type: 'Login', payload: any}
| { type: 'logout' };