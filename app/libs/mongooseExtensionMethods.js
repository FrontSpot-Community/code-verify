export async function findAndCount(
    filter = {},
    projection = null,
    skipLimit = null,
    sort = null
) {
    try {
        const [count, data] = await Promise.all([
            this.count(filter).lean(),
            this.find(filter, projection, skipLimit).sort(sort).lean()
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

export function findAndIncrementField(criteria, field, inc = 1) {
    return this.findOneAndUpdate(
            criteria,
            {$inc: {[field]: inc}},
            {new: true}
        )
        .catch(Promise.reject);
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
