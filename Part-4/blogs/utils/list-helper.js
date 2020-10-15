/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
const dummy = (blogs) => {
  return 1;
};

const likesTotal = (blogasArr) => {
  let likesSum = 0;
  // eslint-disable-next-line guard-for-in
  for (const key in blogasArr) {
    likesSum += blogasArr[key].likes;
  }
  return likesSum;
};

const favoriteBlog = (blogsArr) => {
  let maxLikes = 0;
  let winner = {};
  blogsArr.forEach((el) => {
    if (el.likes > maxLikes) {
      maxLikes = el.likes;
      winner = el;
    }
  });

  return { title: winner.title, author: winner.author, likes: winner.likes };
};

const mostBlogs = (blogsArr) => {
  let winner = {};

  const authorsArr = [];
  blogsArr.forEach((el) => {
    authorsArr.push(el.author);
  });

  const uniqueNamesArr = authorsArr.filter(
    (el, index) => authorsArr.indexOf(el) === index
  );

  const finalArr = [];
  uniqueNamesArr.forEach((el) =>
    finalArr.push({ author: el, duplicates: null })
  );

  const duplicatesArr = [];
  for (const key in uniqueNamesArr) {
    let dublicates = [];
    dublicates = authorsArr.filter((el, index) => el === uniqueNamesArr[key]);
    duplicatesArr.push(dublicates.length);
  }

  let maxDuplicates = 0;
  for (const key in finalArr) {
    finalArr[key].duplicates = duplicatesArr[key];
    if (finalArr[key].duplicates > maxDuplicates) {
      maxDuplicates = finalArr[key].duplicates;
      winner = finalArr[key];
    }
  }

  return { author: winner.author, blogs: winner.duplicates };
};

module.exports = { dummy, likesTotal, favoriteBlog, mostBlogs };
