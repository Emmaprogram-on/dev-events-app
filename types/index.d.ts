/* eslint-disable no-unused-vars*/

declare type SignUpParams = {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
};

declare type SignInProps = {
    email: string;
    password: string;
};

declare type NewUserParams = {
  userId: string;
  email: string;
  name: string;
  password: string;
};