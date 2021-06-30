垂直居中
1. flex布局
display: flex;
align-item:cemter

2. line-height
line-height值设置的与父元素一样高

3. vertical-align:middle 设置行内元素对齐方式
将父元素设置成display:inline/inline-block/inline-table/table-cell/

4. position:absolute/relative/fixed;
top： 50%;
transform：translateY(-50%);
<!-- top: calc((100% - 自身高度)/2); -->
<!-- transform:translateY(calc((100% - 自身高度)/2)) -->



水平居中
1. display: inline-block;（子） text-align:center;（父）
2. disable: table; margin: 0 auto;
2. display: flex; jusity-content:center;
3. left: 50%; transform:translateX(-50%); 距离左侧百分之50，再向左平移自身的百分之50%
<!-- left: calc((100% - 自身宽度)/2) -->
<!-- transform:translateX(calc((100% - 自身宽度)/2)) -->
<!-- margin-left: -自身宽度/2 -->

水平垂直

