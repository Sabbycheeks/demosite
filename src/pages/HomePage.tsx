import { useState } from "react";
import { EstimateForm } from "../components/EstimateForm";
import { Faq } from "../components/Faq";
import { Hero } from "../components/Hero";
import { HowItWorks } from "../components/HowItWorks";
import { Reviews } from "../components/Reviews";
import { ServiceArea } from "../components/ServiceArea";
import { Services } from "../components/Services";
import { TrustBar } from "../components/TrustBar";
import { WhyUs } from "../components/WhyUs";
import { navigate } from "../lib/route";

export function HomePage() {
  const [serviceRequest, setServiceRequest] = useState({ id: "", nonce: 0 });

  function requestService(id: string) {
    setServiceRequest((current) => ({ id, nonce: current.nonce + 1 }));
    navigate("/#contact");
  }

  return (
    <>
      <Hero />
      <TrustBar />
      <Services onRequest={requestService} />
      <WhyUs />
      <HowItWorks />
      <Reviews />
      <ServiceArea />
      <EstimateForm serviceRequest={serviceRequest} />
      <Faq />
    </>
  );
}
