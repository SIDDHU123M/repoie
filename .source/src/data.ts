import { Category } from './types';
import { BookCopy as BookCode, Blocks, Wrench } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 'programming',
    name: 'Programming',
    icon: 'BookCode',
    items: [
      {
        id: 'javascript',
        name: 'JavaScript',
        icon: 'devicon-javascript-plain colored',
        path: 'src/content/javascript.md'
      },
      {
        id: 'python',
        name: 'Python',
        icon: 'devicon-python-plain colored',
        path: 'src/content/python.md'
      },
      {
        id: 'rust',
        name: 'Rust',
        icon: 'devicon-rust-plain colored',
        path: 'src/content/rust.md'
      },
       {
        id: 'bash',
        name: 'Bash & Shell',
        icon: 'devicon-bash-plain colored',
        path: 'src/content/bash.md'
      }
    ]
  },
  {
    id: 'frameworks',
    name: 'Frameworks',
    icon: 'Blocks',
    items: [
      {
        id: 'react',
        name: 'React',
        icon: 'devicon-react-original colored',
        path: 'src/content/react.md'
      },
      {
        id: 'vue',
        name: 'Vue',
        icon: 'devicon-vuejs-plain colored',
        path: 'src/content/vue.md'
      }
    ]
  },
  {
    id: 'tools',
    name: 'Development Tools',
    icon: 'Wrench',
    items: [
      {
        id: 'git',
        name: 'Git and Github',
        icon: 'devicon-git-plain colored',
        path: 'src/content/git.md'
      },
      {
        id: 'docker',
        name: 'Docker',
        icon: 'devicon-docker-plain colored',
        path: 'src/content/docker.md'
      }
    ]
  }
];