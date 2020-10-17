
import GoTrue from 'gotrue-js';
import { authActionCreators } from "store/actions/actionCreators";
import { Dispatch } from "redux";

const auth = new GoTrue({
    APIUrl: process.env.REACT_APP_IDENTITY_URL,
    audience: '',
    setCookie: false,
  });

function addMethod([succesActionCreator, errorActionCreator]: [any, any]) {
    return async function (this: { dispatch: Dispatch }, email: string, password: string) {
        try {
            const user: AuthResponse = await auth.signup(email, password);
      
            this.dispatch(succesActionCreator(user));
            return { data: user };
          } catch(error) {
            this.dispatch(errorActionCreator(error));
            console.error(error);
            return {
              error
            };
          }
    };
}

type AuthResponse = {
    id: string,
    email: string,
    token: {
        "access_token": string,
        "token_type": string,
        "expires_in": number,
        "refresh_token": string,
        "expires_at": number
    }
};

type Constructor = new (...args: any[]) => {
};

function AuthMixin<TBase extends Constructor>(Base: TBase) {
    return class AuthMixin extends Base {
        async signup(this: { dispatch: Dispatch }, email: string, password: string) {
            try {
              const user: AuthResponse = await auth.signup(email, password);
        
              this.dispatch(authActionCreators.signInSuccess(user));
              return { data: user };
            } catch(error) {
              this.dispatch(authActionCreators.signInError(error));
              console.error(error);
              return {
                error
              };
            }
          }
    
          async signin(this: { dispatch: Dispatch },email: string, password: string) {
            this.dispatch(authActionCreators.signInStart());
        
            try {
              const user: AuthResponse = await auth.login(email, password);
              this.dispatch(authActionCreators.signInSuccess(user));
        
              return { data: user };
            } catch(error) {
              this.dispatch(authActionCreators.signInError(error));
              console.error(error);
              return {
                error
              };
            }
          }
    }
}

AuthMixin['signIn'] = addMethod([authActionCreators.signInSuccess, authActionCreators.signInError]);
AuthMixin['signUp'] = addMethod([authActionCreators.signInSuccess, authActionCreators.signUpError]);


export default AuthMixin;