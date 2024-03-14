import BookASlot from "@whjr-engg/book-a-slot/lib/cjs/index";
import "@whjr-engg/book-a-slot/lib/cjs/index.css";
import React, {useState} from "react";

function Example() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isCloseBtn, setIsCloseBtn] = useState(true);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleClick = () => {
    setIsModalOpen(true);
  };
  const modalCloseCallback = () => {
    setIsModalOpen(false);
  };

  const handleExploreBtnClick = (token) => {
    modalCloseCallback && modalCloseCallback();
    window.open(
      `https://dev.byjusweb.com/us/math/?jwt_token=${token}`,
      "_self"
    );
  };

  const handleInstantTrialCallback = (token) => {
    modalCloseCallback && modalCloseCallback();
    window.open(
      `https://learn-stage.whjr.one/join-class/?jwt_token=${token}`,
      "_self"
    );
  };
//   const handleAmplitudeEvent=(eventName="", eventProperties={})=>{
//     console.log('globaltrack', eventName,eventProperties)
//     globalTrackEvent(eventName)({
//      ...eventProperties
//       });
//   }
const handleGetJWTToken = (payload) => {
    console.log("payloadd", payload?.token);
    // setToken(payload?.token);
    localStorage.setItem("tokenn", payload?.token);
    window.parent.postMessage({token:payload?.token}, "*");
  };

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
        />
      ) : null}
    </div>
  );
}

export default Example;
