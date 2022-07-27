const path = require("path");
const { shimFile } = require("./shim");
const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

shimFile(
  resolvePath("../node_modules/react-native-pager-view/android/build.gradle"),
  [
    {
      replace: 129,
      value: "  implementation 'androidx.viewpager2:viewpager2:1.1.0-alpha01'",
    },
  ],
);
shimFile(
  resolvePath(
    "../node_modules/react-native-swiper-flatlist/src/components/SwiperFlatList/SwiperFlatList.tsx",
  ),
  [
    {
      replace: 79,
      value: "({ index: _index, prevIndex: _prevIndex }: any) => {",
    },
  ],
);
