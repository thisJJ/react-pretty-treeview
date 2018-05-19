# react-tree-view

![version](https://thisjj.github.io/badge/react-pretty-treeview-version.svg "Version")

![Preview](https://raw.githubusercontent.com/thisJJ/react-pretty-treeview/master/readme-source/preview.png "Preview")


## Install
```
npm i --save react-pretty-treeview
```

### Update Table

| Update        | version         | date  |
| ------------- |:-------------:| -----:|
| Can customize style in component      | 1.0.18 | 16 May 2018 |
| Can use element class for customize style    | 1.0.21 | 17 May 2018 |
| Fixed bugs style    | 1.0.23 | 18 May 2018 |
| Add custom style    | 1.0.24 | 18 May 2018 |
| Clean file    | 1.0.25 | 19 May 2018 |

## Props

| Props        | Type         | Required  | default  | Description  |
| ------------- |:-------------:| -----:| -----:| -----:|
| childName      | String | none | childs | - |
| labelName      | String | none | name | - |
| labelStyle      | String | none | - | - |
| treeStyle      | String | none | - | - |
| activeName      | String | none | - | - |
| data      | Array or Object if use immutable ( fromJS ) | yes | - | - |
| onSelected      | Function , Response (childObject, rootIndex, selectedName, dataList, rootKeyName, rootKey) => console.log(childObject, rootIndex, selectedName, dataList, rootKeyName, rootKey) | yes | - | - |

## Import for using

```javascript
import TreeView from 'react-pretty-treeview';
```

```javascript
 <TreeView
  labelStyle=''
  treeStyle=''
  activeName='revlon-lipstick'
  data={[
    {
      name: 'revlon test',
      description: '',
      status: 'disable',
      open: true,
      itemSize: 5,
      createdDate: 1522846151,
      updatedDate: 1522897770,
      childs: []
    }
  ]}
  onSelected={ action('onSelected')}
/>
```

## Custom style

```css
//style for treeview node
span.tree-view-node:first-child:before{
  content: '';
  width: 1px;
  height: 100%;
  position: absolute;
  left: -15px;
  top: 0px;
  background-color: #ddd;
}
span.tree-view-node:last-child:before{
  content: '';
  width: 1px;
  height: 0%;
  position: absolute;
  left: -15px;
  top: 0px;
  background-color: #ddd;
}
span.tree-view-node span{
  padding-top: 10px;
  margin-left: 30px;
  position: relative;
  list-style: none;
  display: block;
}
```


```css
//style for treeview label
.tree-view-label{
  cursor: pointer;
  padding: 5px 15px;
  display: inline-block;
  position: relative;
  background-color: #eee;
}
.tree-view-label:hover{
  background: rgba(0,0,0,0.05);
}
.tree-view-label:before{
  content: '';
  width: 1px;
  height: 82%;
  position: absolute;
  left: -15px;
  top: -10px;
  background-color: #ddd;
}

.tree-view-label:after{
  content: '';
  width: 15px;
  height: 1px;
  position: absolute;
  left: -15px;
  top: 50%;
  background-color: #ddd;
}
.tree-view-label.active{
  background-color: #ddd;
  color: #333;
}
.tree-view-label.active:hover{
  background: #eee;
}
```
