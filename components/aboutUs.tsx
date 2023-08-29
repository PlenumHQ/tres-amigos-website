import Image from 'next/image'
import React, { MutableRefObject, useEffect, useRef, useState } from 'react'

import benImg from '../public/img/ben.jpg'
import josecarlosImg from '../public/img/josecarlos.jpg'
import jacekImg from '../public/img/jacek.jpg'
import { AmigoText, SkillMatrix } from './skillMatrix'
import { amigoBio, amigoSkills, Skill } from '@data/aboutUs'
import { typeFast } from '../utils/typical'
import LinkedInIcon from '../public/img/linkedin.png'

export default function AboutUs() {
  const [amigoText, setAmigoText] = useState<Partial<AmigoText>>(amigoBio)
  const [stuck, setStuck] = useState<boolean>(false)

  function setCopy(skills: Skill[]) {
    setStuck(skills[0]?.skill?.name !== undefined)
    const amigosText = skills
      .map(sk => sk.amigos)
      .reduce((acc, val) => ({ ...acc, ...val }), {})
    setAmigoText(amigosText)
  }

  return (
    <section id='aboutus'>
      <div className='sticky top-16 pt-8 z-10 grid gap-4 md:gap-10 grid-cols-1 md:grid-cols-3 mb-4 xl:mb-16 dark:bg-trueGray-900 bg-white shadow-fade-in-white dark:shadow-fade-in-black'>
        <Amigo
          name='Benjamin Grohbiel'
          title='Senior Engineering Manager at Snyk'
          image={benImg}
          profileLink={'https://www.linkedin.com/in/bengro/'}
          stuck={stuck}
        >
          {amigoText.ben}
        </Amigo>
        <Amigo
          name='Jacek Rzeniewicz'
          title='Senior Engineer at Snyk'
          image={jacekImg}
          profileLink={'https://www.linkedin.com/in/jacekrzrz/'}
          stuck={stuck}
        >
          {amigoText.jacek}
        </Amigo>
        <Amigo
          name='Jose Carlos Valero Sanchez'
          title='Staff Architect at Snyk'
          image={josecarlosImg}
          profileLink={'https://www.linkedin.com/in/josecarlosvalerosanchez/'}
          stuck={stuck}
        >
          {amigoText.jc}
        </Amigo>
      </div>

      <SkillMatrix
        onSelected={setCopy}
        order={['ben', 'jacek', 'jc']}
        data={amigoSkills}
      />
    </section>
  )
}

const Amigo = ({ name, title, image, profileLink, children, stuck }) => {
  const amigoSaysRef: MutableRefObject<HTMLElement> = useRef<HTMLElement>()
  useEffect(() => {
    if (!amigoSaysRef || !amigoSaysRef.current) return
    else typeFast(amigoSaysRef.current, children)
  }, [children])
  return (
    <div
      className={`lg:col-auto transition-opacity ${
        !children ? 'opacity-30 blur' : ''
      }`}
    >
      <div
        className={`stuck-${
          stuck ? 'in' : 'out'
        } relative h-24 md:h-48 shadow-md flex flex-col justify-start bg-gray-100 p-2 md:p-4 rounded-2xl dark:bg-trueGray-800`}
      >
        <Avatar
          image={image}
          name={name}
          title={title}
          profileLink={profileLink}
        />

        <section
          id={`amigo-${name}`}
          ref={amigoSaysRef}
          className='animate-cursor amigo-card__content ml-2 pl-24 md:pl-0 md:ml-0 text-sm md:text-xs lg:text-sm xl:text-base leading-normal lg:px-2 flex-none line-clamp-3 md:line-clamp-5'
        />
      </div>
    </div>
  )
}

function Avatar({ image, name, title, profileLink }) {
  return (
    <div className='flex flex-none items-center mb-2 md:mb-4 xl:mb-6 space-x-3'>
      <div
        className={`absolute top-0 left-0 md:relative flex-shrink-0 overflow-hidden rounded-xl md:rounded-full w-24 h-24 md:w-16 md:h-16 lg:w-20 lg:h-20 md:-mt-8 md:-ml-8 shadow`}
      >
        <Image
          src={image}
          width='80'
          height='80'
          alt='Avatar'
          layout='responsive'
          placeholder='blur'
        />
      </div>
      <div className='amigo-card__name !ml-2 pl-24 md:pl-0 flex w-full flex-col'>
        <div className='text-base xl:text-lg font-medium line-clamp-1'>
          {name}
          <span className={'pl-2 align-middle'}>
            <a href={profileLink} target={'_blank'}>
              <Image
                src={LinkedInIcon}
                width='16'
                height='16'
                alt='LinkedIn profile of {name}'
              />
            </a>
          </span>
        </div>
        <div className='text-xs xl:text-base text-gray-600 dark:text-gray-400 line-clamp-1'>
          {title}
        </div>
      </div>
    </div>
  )
}
