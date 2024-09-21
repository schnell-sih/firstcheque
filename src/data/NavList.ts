interface navOptions {
  title: string;
  route: string;
}

const withAuthOptionsFreelancer: navOptions[] = [
  { title: "Discover", route: "/" },
  { title: "Explore", route: "/explore" },
  { title: "ChatBot", route: "/chatbot" },
];

const withAuthOptionsEmployer: navOptions[] = [
  { title: "Discover", route: "/" },
  { title: "Explore", route: "/explore" },
  { title: "Post A Job", route: "/postJob" },
];

const withoutAuthOptions: navOptions[] = [
  { title: "Home", route: "/" },
  { title: "Explore", route: "/explore" },
];

export {
  withAuthOptionsFreelancer,
  withAuthOptionsEmployer,
  withoutAuthOptions,
};
