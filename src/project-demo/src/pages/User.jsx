import React from 'react';
import { connect } from 'react-redux';

function UserPage({ user }) {
  console.log(user.userInfo);

  return <div>User</div>;
}

export const User = connect(({ user }) => ({ user }))(UserPage);
