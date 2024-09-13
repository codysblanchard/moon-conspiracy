const fs = require("fs");
const images = fs.readdirSync("img");
let data = fs.readFileSync("index.html", "utf8");
let formattedHTML = data;

const links = [
  "https://discord.gg/hvNBnDKN",
  "https://drive.google.com/file/d/1Q0f-sU5jzK2pneHP3e9iZpeGQXT4Pao0/view",
];

let regex = /src=".+%.+?"/g;
let match;
let index = 0;
let imgMatches = [];

while ((match = regex.exec(data)) !== null) {
  imgMatches.push(match);
}
for (var link in imgMatches) {
  let imgIndex = index % images.length;
  formattedHTML = formattedHTML.replace(
    imgMatches[link],
    `src="img/${images[imgIndex]}"`,
  );
  index++;
}

let hrefRegex = /href=".+?"/gi;
index = 0;
let hrefMatches = [];

while ((match = hrefRegex.exec(data)) !== null) {
  hrefMatches.push(match);
}
for (var link in hrefMatches) {
  let imgIndex = index % links.length;
  formattedHTML = formattedHTML.replace(
    hrefMatches[link],
    `href="${links[imgIndex]}"`,
  );
  index++;
}

// Step 3: Write the formatted HTML to a new file
fs.writeFile("output.html", formattedHTML, (err) => {
  if (err) {
    console.error("Error writing the file:", err);
    return;
  }
  console.log("Formatted HTML file has been saved as output.html");
});
