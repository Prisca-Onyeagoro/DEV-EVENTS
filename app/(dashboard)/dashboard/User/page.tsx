import Link from "next/link";
import React from "react";

const UsersPage = () => {
  return (
    <div>
      <Link href={"/dashboard/User/1"}>User1</Link>
    </div>
  );
};

export default UsersPage;
