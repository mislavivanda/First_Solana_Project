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
              receivedTransactionIds
              supportedCreatorIds
              creatorAbout
              creatorTags
              creatorWalletAddress
            }
        }
      }`,
      {
        userId,
      }
    );
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
      receivedTransactionIds:
        user.data.usersCollection.items[0].receivedTransactionIds || [],
      supportedCreatorIds:
        user.data.usersCollection.items[0].supportedCreatorIds || [],
      creatorAbout: user.data.usersCollection.items[0].creatorAbout,
      creatorTags: user.data.usersCollection.items[0].creatorTags,
      creatorWalletAddress:
        user.data.usersCollection.items[0].creatorWalletAddress,
    };
  } else return null;
}

export async function getPostData(postSlug, onlyCreatorId) {
  try {
    var post = await fetchGraphQLContentfulData(
      `           
         query($postSlug:String){
            postCollection(preview:false where:{slug:$postSlug}){
            items {
              creatorId
              ${
                onlyCreatorId
                  ? ""
                  : `createdAt
                      title
                      tags
                      slug
                      content`
              }
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
              userId
              name
              surname
              isCreator
              receivedTransactionIds
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
        receivedTransactionIds:
          creator.data.usersCollection.items[0].receivedTransactionIds || [],
        collectionAddress,
      };
    } else return null;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCreatorPostsCount(creatorId) {
  try {
    const creatorPosts = await fetchGraphQLContentfulData(
      `           
         query($creatorId:String){
            postCollection(preview:false where:{creatorId:$creatorId}){
            items {
                slug
            }
        }
      }`,
      {
        creatorId,
      }
    );
    return creatorPosts.data.postCollection.items.length;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCreatorMetadata(creatorId) {
  //*DOHVATI SUPPORTED CREATORE OD USERA
  try {
    let creatorData = null;
    const creatorMetadata = await getUserMetadataByUserId(creatorId);
    if (creatorMetadata && creatorMetadata.isCreator) {
      const creatorPostsCount = await getCreatorPostsCount(creatorId);
      creatorData = {
        creatorId: creatorId,
        name: creatorMetadata.name,
        surname: creatorMetadata.surname,
        supportersCount: creatorMetadata.receivedTransactionIds.length,
        postsCount: creatorPostsCount,
        about: creatorMetadata.creatorAbout,
        tags: creatorMetadata.creatorTags,
        collectionAddress: creatorMetadata.collectionAddress,
        creatorWalletAddress: creatorMetadata.creatorWalletAddress,
      };
    }
    return creatorData;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getUserSupportedCreatorsData(userId) {
  //*DOHVATI SUPPORTED CREATORE OD USERA
  try {
    var user = await fetchGraphQLContentfulData(
      `           
      query($userId:String){
        usersCollection(preview:false where:{userId:$userId}){
            items {
              supportedCreatorIds
            }
        }
      }`,
      {
        userId,
      }
    );
    if (user.data.usersCollection.items.length === 1) {
      const userSupportedCreatorIds =
        user.data.usersCollection.items[0].supportedCreatorIds || [];
      let creatorsData = [];
      for (let i = 0; i < userSupportedCreatorIds.length; i++) {
        const creatorData = await getCreatorMetadata(
          userSupportedCreatorIds[i]
        );
        creatorData && creatorsData.push(creatorData);
      }
      return creatorsData;
    } else return [];
    //*DOHVATI PODATKE ZA SVAKOG CREATORA
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getMostPopularCreatorsData(limitCount) {
  try {
    var popularCreators = await fetchGraphQLContentfulData(
      `           
         query{
            usersCollection(preview:false where:{isCreator:true} limit:${limitCount}){
            items {
              userId
              name
              surname
              receivedTransactionIds
            }
        }
      }`
    );
    for (
      let i = 0;
      i < popularCreators.data.usersCollection.items.length;
      i++
    ) {
      popularCreators.data.usersCollection.items[i].postsCount =
        await getCreatorPostsCount(
          popularCreators.data.usersCollection.items[i].userId
        );
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
  return popularCreators.data.usersCollection.items.map((item) => ({
    creatorId: item.userId,
    name: item.name,
    surname: item.surname,
    supportersCount: item.receivedTransactionIds
      ? item.receivedTransactionIds.length
      : 0,
    postsCount: item.postsCount,
  }));
}

export async function getCreatorPosts(creatorId) {
  try {
    var creatorPosts = await fetchGraphQLContentfulData(
      `           
         query($creatorId:String){
            postCollection(preview:false where:{creatorId:$creatorId}){
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
        creatorId,
      }
    );
    return creatorPosts.data.postCollection.items;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
}

export async function getCreatorAnalyticsData(creatorId) {
  try {
    var user = await fetchGraphQLContentfulData(
      `           
         query($creatorId:String){
            usersCollection(preview:false where:{userId:$creatorId}){
            items {
              receivedTransactionIds
            }
        }
      }`,
      {
        creatorId,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }

  if (user.data.usersCollection.items.length === 1) {
    //*ZBROJI SUMU SVIH TRANSKACIJA
    let totalReceivedAmmount = 0;
    const receivedTransactions = await fetchGraphQLContentfulData(
      `           
         query($transactionIds:[String!]){
            transactionCollection(preview: false, where: { transactionId_in: $transactionIds }){
            items {
              creatorReceivedAmmount
            }
        }
      }`,
      {
        transactionIds:
          user.data.usersCollection.items[0].receivedTransactionIds || [],
      }
    );
    receivedTransactions.data.transactionCollection.items.forEach(
      (item) => (totalReceivedAmmount += item.creatorReceivedAmmount)
    );
    return {
      supportersCount: user.data.usersCollection.items[0].receivedTransactionIds
        ? user.data.usersCollection.items[0].receivedTransactionIds.length
        : 0,
      totalReceivedAmmount,
    };
  } else return {};
}
