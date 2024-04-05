/// <reference types="vite/client" />

//users types
interface userInfoType {
  username: string;
  picture: string;
  email: string;
  saveCodes: Array<string>;
}

interface loginCredentialType {
  userId: string;
  password: string;
}

interface signupCredentialType {
  username: string;
  email: string;
  password: string;
}

interface codeType {
  fullCode: CompilerSliceStateType["fullCode"];
  title: string;
  _id: string;
}
