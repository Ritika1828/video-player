import BookASlot from "@whjr-engg/book-a-slot/lib/cjs/index";
import "@whjr-engg/book-a-slot/lib/cjs/index.css";
import React, { useState, useEffect } from "react";
import globalTrackEvent from "./utils/globalTrackEvents";

function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCloseBtn, setIsCloseBtn] = useState(true);
  const [isDesktop, setIsDesktop] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const [token, setToken] = useState("");

  console.log('window?.screen?.width',isDesktop)

  const handleClick = () => {
    setIsModalOpen(true);
  };
  function handleResize() {
    console.log(window?.screen?.availWidth, window?.innerWidth, window?.screen?.width, 'window?.screen?.width')
    if (window?.innerWidth >= 550 &&  window?.innerWidth <= 650 &&  window?.screen?.width >= 768) {
      setIsDesktop(true);
    } else {
      setIsDesktop(false);
    }
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, []);
  const modalCloseCallback = () => {
    // setIsModalOpen(false);
    window.parent.postMessage("close", "*");
    // window.parent.postMessage(JSON.stringify({
    //   close:true
    // }), "*");
  };

  const handleExploreBtnClick = (token) => {
    // modalCloseCallback && modalCloseCallback();
    // window.open(
    //   `https://dev.byjusweb.com/us/math/?jwt_token=${token}`,
    //   "_self"
    // );
    window.parent.postMessage(
      JSON.stringify({
        click: "explore",
        url: `https://dev.byjusweb.com/us/math/?jwt_token=${token}`,
      }),
      "*"
    );
  };

  const handleInstantTrialCallback = (token) => {
    // modalCloseCallback && modalCloseCallback();
    // window.open(
    //   `https://learn-stage.whjr.one/join-class/?jwt_token=${token}`,
    //   "_self"
    // );
    window.parent.postMessage(
      JSON.stringify({
        click: "instant",
        url: `https://learn-stage.whjr.one/join-class/?jwt_token=${token}`,
      }),
      "*"
    );
  };
  const handleAmplitudeEvent = (eventName = "", eventProperties = {}) => {
    console.log("globaltrack", eventName, eventProperties);
    globalTrackEvent(eventName)({
      ...eventProperties,
    });
  };
  const handleGetJWTToken = (payload) => {
    console.log("payloadd", payload?.token);
    // setToken(payload?.token);
    localStorage.setItem("tokenn", payload?.token);
    window.parent.postMessage(
      JSON.stringify({
        token: payload?.token,
      }),
      "*"
    );
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    console.log(urlParams, "urlParams");
    const token = urlParams.get("token");
    console.log(token, "urlParams");

    setToken(token);
  }, []);

  return (
    <div>
      <button onClick={handleClick}>click</button>
      {/* <BookDemoSlot isModalOpen={isModalOpen} modalCloseCallback={modalCloseCallback}/> */}
      {isModalOpen ? (
        <BookASlot
          apiBaseUrl="https://stage-api.whjr.one"
          modalCloseCallback={modalCloseCallback}
          isBrainlyLayout={true}
          gradeOptions={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
          clientName="brainly"
          handleExploreBtnClick={handleExploreBtnClick}
          handleInstantTrialCallback={handleInstantTrialCallback}
          handleGetJWTToken={handleGetJWTToken}
          handleAmplitudeEvent={handleAmplitudeEvent}
          userToken={token}
          isDesktop={isDesktop}
        />
      ) : null}
    </div>
  );
}

export default Example;
