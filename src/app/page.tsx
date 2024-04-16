import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import uploadIcon from '@static/upload-icon.png'
import chainLink from '@static/chainLink.png'
import graphIcon from '@static/graph-icon.png'

export default function Home() {
    return (
        <>
        <div className='grid grid-cols-3 m-6'>
            <div className='col-start-1 '>
                <h1>Step 1</h1>
                <li>
                    Upload Spreadsheet
                    <br />
                    <b>
                        Locate your climbing history spreadsheet and upload it
                        <br />
                        Program accepts most common file types including .csv, .xls, .xlsx
                    </b>
                </li>
            </div>
            <div className='col-start-2'>
                <h1>Step 2</h1>
                <li>
                    Match Spreadsheet Data
                    <br />
                    <b>
                        Match Your Spreadsheet Data to the Acceptable Headers in the database. 
                        <br />
                        Validate your data so that your visualizations are accurate.
                    </b>
                </li>
            </div>
            <div className='col-start-3'>
                <h1>Step 3</h1>
                <li>
                    Explore Data
                    <br />
                    <b>
                        Visualize your climbing history data and explore your climbing habits.
                    </b>
                </li>
            </div>
            <div className='col-start-1 '>
                <Image src={uploadIcon} alt="upload" style={{ width:'15rem', height:'auto'}}/>
            </div>
            <div className='col-start-2'>
                <Image src={chainLink} alt="link" style={{ width:'15rem', height:'auto'}}/>
            </div>
            <div className='col-start-3'>
                <Image src={graphIcon} alt="graph" style={{ width:'15rem', height:'auto'}}/>
            </div>
        </div>
        <Link 
        className='flex justify-center m-6 text-2xl underline cursor-pointer'
        href='/ImportData'>
            <b>Let's Get Started!</b>
        </Link>
        </>
    )
}