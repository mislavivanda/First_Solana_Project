import { fetchGraphQLContentfulData } from "../helpers";

export async function getUser(email, password) {
  //provjera postoji li user kod credentials login
  try {
    var user = await fetchGraphQLContentfulData(
      `           
         query($email:String, $password:String){
            userCollection(preview:false where:{email:$email,password:$password}){
            items {
              name
              surname
              email
            }
        }
      }`,
      {
        email: email,
        password: password,
      }
    );
    console.log("User", user);
  } catch (error) {
    throw new Error(error);
  }

  if (user.data.userCollection.items.length > 0) {
    return {
      name: user.data.userCollection.items[0].name,
      surname: user.data.userCollection.items[0].surname,
      email: user.data.userCollection.items[0].email,
    };
  } else return null;
}
