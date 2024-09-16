interface navOptions {
  title: string;
  route: string;
}

const freelancerWithAuthOptions: navOptions[] = [
  { title: "Discover", route: "/" },
  { title: "Explore", route: "/explore" },
  { title: "ChatBot", route: "/chatbot" },
];

const employerWithAuthOptions: navOptions[] = [
  { title: "Discover", route: "/" },
  { title: "Post a Job", route: "/postAJob" },
  { title: "ChatBot", route: "/chatbot" },
];

const withoutAuthOptions: navOptions[] = [
  { title: "Home", route: "/" },
  { title: "Explore", route: "/explore" },
];

export {
  freelancerWithAuthOptions,
  employerWithAuthOptions,
  withoutAuthOptions,
};
