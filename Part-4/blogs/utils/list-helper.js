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

const uthorArrCreate = (arrBologs, arrAuthors) => {
  arrBologs.forEach((el) => {
    arrAuthors.push(el.author);
  });
  return arrAuthors;
};

const uniqueNamesFind = (arr) => {
  const filtered = arr.filter((el, index) => arr.indexOf(el) === index);
  return filtered;
};

const mostBlogs = (blogsArr) => {
  let winner = {};

  const authorsArr = [];
  // eslint-disable-next-line no-const-assign
  uthorArrCreate(blogsArr, authorsArr);

  const uniqueNamesArr = uniqueNamesFind(authorsArr);
  // console.log('unique names', uniqueNamesArr);

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

const mostLikes = (blogasArr) => {
  let winner = {};

  const authorsArr = [];
  uthorArrCreate(blogasArr, authorsArr);
  const uniqueNamesArr = uniqueNamesFind(authorsArr);

  const finalArr = [];
  uniqueNamesArr.forEach((el) => finalArr.push({ author: el, likes: null }));

  finalArr.forEach((el) => {
    for (const key in blogasArr) {
      if (blogasArr[key].author === el.author) {
        // eslint-disable-next-line no-param-reassign
        el.likes += blogasArr[key].likes;
      }
    }
  });

  let maxLikes = 0;
  for (const key in finalArr) {
    if (finalArr[key].likes > maxLikes) {
      maxLikes = finalArr[key].likes;
      winner = finalArr[key];
    }
  }

  return { author: winner.author, likes: winner.likes };
};

module.exports = { dummy, likesTotal, favoriteBlog, mostBlogs, mostLikes };
