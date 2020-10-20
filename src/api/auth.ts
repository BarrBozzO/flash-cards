
import GoTrue from 'gotrue-js';
import { authActionCreators } from "store/actions/actionCreators";
import { Dispatch } from "redux";

const auth = new GoTrue({
    APIUrl: process.env.REACT_APP_IDENTITY_URL,
    audience: '',
    setCookie: false,
  });

function addMethod(authMethod: 'login' | 'signup', [startActionCreator, succesActionCreator, errorActionCreator]: [any, any, any]) {
    return async function (this: { dispatch: Dispatch }, email: string, password: string) {
        try {
          this.dispatch(startActionCreator());
          
            const user: AuthResponse = await auth[authMethod](email, password);
      
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
    class AuthMixin extends Base {
      public signIn: (this: { dispatch: Dispatch }, email: string, password: string) => Promise<{ data: AuthResponse } | { error: string } >;
      public signUp: (this: { dispatch: Dispatch }, email: string, password: string) => Promise<{ data: AuthResponse } | { error: string } >;

      constructor(...args: any[]) {
        super(...args);

        this.signIn = addMethod('login', [authActionCreators.signInStart, authActionCreators.signInSuccess, authActionCreators.signInError]);
        this.signUp = addMethod('signup', [authActionCreators.signUpStart, authActionCreators.signUpSuccess, authActionCreators.signUpError]);
      }
    }

    return AuthMixin;
}



export default AuthMixin;