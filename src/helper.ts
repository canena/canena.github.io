import { getCollection } from 'astro:content';

const posts = (await getCollection('posts')).sort(
	(a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf()
);

type Post = typeof posts[0];

const postsByTag: Record<string, Post[]> = {};

for (const post of posts) {
    for (const tag of post.data.tags) {
        if (!postsByTag[tag]) {
            postsByTag[tag] = [];
        }
        postsByTag[tag].push(post);
    }
}
for (const [tag] of Object.entries(postsByTag)) {
    postsByTag[tag].sort((a, b) => a.slug < b.slug ? -1 : a.slug > b.slug ? 1 : 0);
}

export {
    postsByTag,
}
