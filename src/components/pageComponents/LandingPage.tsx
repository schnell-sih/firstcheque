const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen items-center text-center justify-center">
      <HeroElement />
      <div className="flex justify-center mx-16 mb-52">
        <Card>
          <LandingAbout />
          <LandingServices />
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
