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

## Props

| Props        | Type         | Required  | default  | Description  |
| ------------- |:-------------:| -----:| -----:|
| childName      | String | none | childs | - |
| labelName      | String | none | name | - |
| labelStyle      | String | none | - | - |
| treeStyle      | String | none | - | - |
| activeName      | String | none | - | - |
| data      | Array or Object if use immutable ( fromJS ) | yes | - | - |
| onSelected      | Function , Response (childObject, rootIndex, selectedName, dataList, rootKeyName, rootKey) => console.log(childObject, rootIndex, selectedName, dataList, rootKeyName, rootKey) | yes | - | - |

## Import for using
```
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
