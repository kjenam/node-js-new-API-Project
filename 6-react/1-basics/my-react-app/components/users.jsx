/* eslint-disable react-hooks/set-state-in-effect */
//example fetch for useEffect Hook

import { useState, useEffect } from "react";

function UserCard({ user }) {
  return (
    <div className="card">
      <p>{`${user.firstName} ${user.lastName}`}</p>
    </div>
  );
}

export default function Users() {
  const [users, setUsers] = useState(null);
  const [fetchIt, setFetchIt] = useState(false);

  async function fetchData() {
    try {
      const res = await fetch("https://dummyjson.com/users");
      const data = await res.json();
      setUsers(data.users);
    } catch (err) {
      console.error("Error occurred while fetching data", err);
    }
  }

  // this req squiggly is an eslint error, basically asking me to move the definition of fetchData function inside the useEffect
  useEffect(() => {
    console.log("useState on page load");
  }, []);

  useEffect(() => {
    if (!fetchIt) {return}
    console.log("useState on page load");
    fetchData()
  }, [fetchIt]);

  return (
    <>
      <button onClick={() => {setFetchIt(true)}}>FetchData</button>
      {!users ? (
        fetchIt? 
        <p>Loading...</p> : <p>press to fetch</p>
      ) : (
        users.map((user) => <UserCard key={user.id} user={user} />)
      )}
    </>
  );
}
