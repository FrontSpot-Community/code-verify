export async function findAndCount(
    filter = {},
    skipLimit = null,
    sort = null
) {
    try {
        const [count, data] = await Promise.all([
            this.count(filter),
            this.find(filter, null, skipLimit).sort(sort)
        ]);
        return {
            count,
            data
        };
    } catch (exception) {
        return Promise.reject(exception);
    }
}

export async function findOneOrCreate(criteria, document) {
    try {
        const data = await this.findOne(criteria);

        const insertDocument = (doc) => {
            const objectToSave = new this(githubModelToUserModel(doc));

            return objectToSave
                .save()
                .then((savedData) => savedData )
                .catch((error) => Promise.reject(error));
        };

        return data ? data : insertDocument(document);
    } catch (exception) {
        return Promise.reject(exception);
    }
}

export async function findOneOrThrow(criteria) {
  try {
    const data = await this.findOne(criteria);
    return data ? data : Promise.reject({status: 404, message: 'Not Found'});
  } catch (exception) {
    return Promise.reject(exception);
  }
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
