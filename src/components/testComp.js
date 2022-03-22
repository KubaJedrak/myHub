



export default function testComp(user, userID) {
  return (
    <div>
      <h2>Super Secret Content:</h2>
      {user && <h4>{userID}</h4>}
      {!user && <h4 color="red">Sorry, you can't see this content</h4>}
    </div>
  )
}
