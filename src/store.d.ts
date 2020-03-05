interface CStore {
  config: config,
  user: user
}

interface config {
  version: string,
  url_base: string,
  api_base: string,
  ws_base: string
}

interface user {
  islogin: boolean,
  username: string,
  email: string,
  qq: number,
  iconUrl: string,
  cb: number
}
