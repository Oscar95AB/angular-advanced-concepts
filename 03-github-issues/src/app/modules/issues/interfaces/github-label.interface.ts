export interface GitHubLabel {
  id:          number;
  node_id:     string;
  url:         string;
  name:        string;
  description?: null | string;
  color:       string;
  default:     boolean;
}
