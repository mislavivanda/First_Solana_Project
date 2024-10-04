import { fetchGraphQLContentfulData } from "../helpers";

export async function getUser(email, password) {
  //provjera postoji li user kod credentials login
  try {
    var user = await fetchGraphQLContentfulData(
      `           
         query($email:String, $password:String){
            usersCollection(preview:false where:{email:$email,password:$password}){
            items {
              name
              surname
              email
              isCreator
              collectionNft{
                ...on Nft { 
                    address
                }
              }
              userId
            }
        }
      }`,
      {
        email: email,
        password: password,
      }
    );
    console.log(user.data.usersCollection.items[0]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  if (user.data.usersCollection.items.length === 1) {
    return {
      name: user.data.usersCollection.items[0].name,
      surname: user.data.usersCollection.items[0].surname,
      email: user.data.usersCollection.items[0].email,
      isCreator: user.data.usersCollection.items[0].isCreator,
      collectionAddress:
        user.data.usersCollection.items[0].collectionNft &&
        user.data.usersCollection.items[0].collectionNft.address,
      userId: user.data.usersCollection.items[0].userId,
    };
  } else return null;
}

export async function getUserMetadataByUserId(userId) {
  //provjera postoji li user kod credentials login
  try {
    var user = await fetchGraphQLContentfulData(
      `           
         query($userId:String){
            usersCollection(preview:false where:{userId:$userId}){
            items {
              isCreator
              collectionNft{
                ...on Nft { 
                    address
                }
              }
            }
        }
      }`,
      {
        userId,
      }
    );
    console.log(user.data.usersCollection.items[0]);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  if (user.data.usersCollection.items.length === 1) {
    return {
      isCreator: user.data.usersCollection.items[0].isCreator,
      collectionAddress:
        user.data.usersCollection.items[0].collectionNft &&
        user.data.usersCollection.items[0].collectionNft.address,
    };
  } else return null;
}
