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
              collectionNftAddress
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
        user.data.usersCollection.items[0].collectionNftAddress,
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
              name
              surname
              isCreator
              sys {
                id
              }
              collectionNftAddress
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
      entryId: user.data.usersCollection.items[0].sys.id,
      name: user.data.usersCollection.items[0].name,
      surname: user.data.usersCollection.items[0].surname,
      isCreator: user.data.usersCollection.items[0].isCreator,
      collectionAddress:
        user.data.usersCollection.items[0].collectionNftAddress,
    };
  } else return null;
}

export async function getPostData(postSlug) {
  //provjera postoji li user kod credentials login
  try {
    var post = await fetchGraphQLContentfulData(
      `           
         query($postSlug:String){
            postCollection(preview:false where:{slug:$postSlug}){
            items {
              creatorId
              createdAt
              title
              tags
              slug
              content
            }
        }
      }`,
      {
        postSlug,
      }
    );

    if (post.data.postCollection.items.length === 1) {
      return {
        creatorId: post.data.postCollection.items[0].creatorId,
        createdAt: post.data.postCollection.items[0].createdAt,
        title: post.data.postCollection.items[0].title,
        tags: post.data.postCollection.items[0].tags,
        slug: post.data.postCollection.items[0].slug,
        content: post.data.postCollection.items[0].content,
      };
    } else return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCollectionNFTCreatorData(collectionAddress) {
  try {
    var creator = await fetchGraphQLContentfulData(
      `           
         query($collectionAddress:String){
            usersCollection(preview:false where:{isCreator:true, collectionNftAddress: $collectionAddress}){
            items {
              name
              surname
              isCreator
              sys {
                id
              }
            }
        }
      }`,
      {
        collectionAddress,
      }
    );

    if (creator.data.usersCollection.items.length === 1) {
      return {
        entryId: creator.data.usersCollection.items[0].sys.id,
        creatorId: creator.data.usersCollection.items[0].userId,
        name: creator.data.usersCollection.items[0].name,
        surname: creator.data.usersCollection.items[0].surname,
        isCreator: creator.data.usersCollection.items[0].isCreator,
        collectionAddress:
          creator.data.usersCollection.items[0].collectionNftAddress,
      };
    } else return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}
