import React from "react";

type SideBarProps = {
  active: string;
};

const SideBar: React.FC<SideBarProps> = ({ active }) => {
  const pages = [
    {
      name: "Seekers",
      onPress: () => {
        // return navigate("/seekers");
      },
    },
    {
      name: "Listeners",
      onPress: () => {
        // return navigate("/listeners");
      },
    },
    {
      name: "Therapists",
      onPress: () => {
        // return navigate("/therapists");
      },
    },
    {
      name: "Chats",
      onPress: () => {
        // return navigate("/chats");
      },
    },
    {
      name: "Sessions",
      onPress: () => {
        // return navigate("/sessions");
      },
    },
    {
      name: "Chat requests",
      onPress: () => {
        // return navigate("/chatrequest");
      },
    },
    {
      name: "Moderation",
      onPress: () => {
        // return navigate("/moderation");
      },
    },
    {
      name: "Logout",
      onPress: async () => {
        // await logoutFromFirebase(auth.currentUser);
        // return navigate("/");
      },
    },
  ];

  const renderPages = () => {
    return pages.map((item, index) => (
      <button
        key={index}
        onClick={() => {
          item.onPress();
        }}
      >
        <p
          className={`text-white text-2xl text-left leading-8 my-3 ${
            item.name === active ? "underline" : ""
          }`}
        >
          {item.name}
        </p>
      </button>
    ));
  };

  return (
    <div className="flex flex-col bg-primary1 w-full h-full px-7 py-16">
      {renderPages()}
    </div>
  );
};

export default SideBar;
