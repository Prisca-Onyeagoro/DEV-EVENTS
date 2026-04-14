import React from "react";

const UserDetails = async ({ params }: { params: { id: string } }) => {
  const { id } = await params;
  return (
    <div>
      <h1>Welcome user,{id}!</h1>
    </div>
  );
};

export default UserDetails;