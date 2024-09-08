interface navOptions {
  title: string;
  route: string;
}
const withAuthOptions: navOptions[] = [
  { title: "Discover", route: "/" },
  { title: "Explore", route: "/explore" },
  { title: "ChatBot", route: "/chatbot" },
];
const withoutAuthOptions: navOptions[] = [
  { title: "Home", route: "/" },
  { title: "Explore", route: "/explore" },
];
export { withAuthOptions, withoutAuthOptions };
