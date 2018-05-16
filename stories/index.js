import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import TreeView from '../source/lib/TreeView'
storiesOf('TreeView', module)
  .add('TreeView', () => {
    return (
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
          },
          {
            name: 'revlon',
            description: '',
            status: 'disable',
            open: true,
            itemSize: 5,
            createdDate: 1522846151,
            updatedDate: 1522897770,
            childs: [
              {
                name: 'revlon-lipstick',
                parentName: null,
                score: 0,
                description: '',
                status: 'disable',
                open: true,
                metadata: {
                  prettyUrl: 'revlon-lipstick',
                  description: '',
                  title: 'revlon-lipstick'
                },
                childs: []
              },
              {
                name: 'revlon-mascara',
                parentName: null,
                score: 1,
                description: '',
                status: 'disable',
                open: true,
                metadata: {
                  prettyUrl: 'revlon-mascara',
                  description: '',
                  title: 'revlon-mascara'
                },
                childs: [
                  {
                    name: 'revlon-eye-pencil',
                    parentName: 'revlon-mascara',
                    score: 0,
                    label: {
                      en: 'gg',
                      th: 'gg',
                      cn: '',
                    },
                    description: '',
                    status: 'disable',
                    open: true,
                    metadata: {
                      prettyUrl: 'revlon-eye-pencil',
                      description: '',
                      title: 'revlon-eye-pencil'
                    },
                    childs: [
                      {
                        name: 'revlon-eye-pencilcil',
                        parentName: 'revlon-eye-pencil',
                        score: 0,
                        label: {
                          en: 'Eye Pencilcil',
                          th: 'Eye Pencilcil',
                          cn: '',
                        },
                        description: '',
                        status: 'disable',
                        open: true,
                        metadata: {
                          prettyUrl: 'revlon-eye-pencilcil',
                          description: '',
                          title: 'revlon-eye-pencilcil'
                        },
                        childs: []
                      }
                    ]
                  }
                ]
              },
            ]
          },
          {
            name: 'revlon2',
            description: '',
            status: 'disable',
            open: true,
            itemSize: 5,
            createdDate: 1522846151,
            updatedDate: 1522897770,
            childs: [
              {
                name: 'revlon-lipstick2',
                parentName: null,
                score: 0,
                description: '',
                status: 'disable',
                open: true,
                metadata: {
                  prettyUrl: 'revlon-lipstick',
                  description: '',
                  title: 'revlon-lipstick'
                },
                childs: []
              },
            ]
          }
        ]}
        onSelected={ action('onSelected')}
      />
    )
  })
