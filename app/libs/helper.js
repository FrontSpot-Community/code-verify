export async function findAndCount(
    filter = {},
    skipLimit = null,
    sort = null,
    populate = null
) {
    const [count, data] = await Promise.all([
        this.count(filter),
        this.find(filter, null, skipLimit).sort(sort)
    ]);
    return {
        count,
        data
    };
}

export async function findOneOrCreate(criteria, document) {
     const data = await this.findOne(criteria);

     const insertDocument = (doc) => {
         const objectToSave = new this(githubModelToUserModel(document));

         return objectToSave
             .save()
             .then((savedData) => savedData )
             .catch((error) => Promise.reject(error));
     };

     return data ? data : insertDocument(document);
}

export function githubModelToUserModel(githubUser) {
    return {
        githubId: githubUser.id,
        githubUsername: githubUser.username,
        githubDisplayName: githubUser.displayName,
        githubProfileUrl: githubUser.profileUrl,
        githubLogin: githubUser._json.login,
        gitHubAvatar_url: githubUser._json.avatar_url
    };
}
