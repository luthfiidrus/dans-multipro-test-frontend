import React, { useState } from 'react';
import axios from 'axios';
import style from './JobList.module.css';

const JobList = () => {

    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [fullTime, setFullTime] = useState(false);
    const [page, setPage] = useState(1);
    const [jobList, setJobList] = useState([]);

    const handleSubmit = async () => {
        try {
            const response = await axios.get('http://localhost:8080/get-job-list', {
                params: {
                    description: description,
                    location: location,
                    full_time: fullTime,
                    page: page
                },
                withCredentials: true
            });
            setJobList(response.data);

        }
        catch (err) {
            console.log(err);
        }
    }

    const handleMoreJobs = async () => {
        try {
            console.log(page);
            const response = await axios.get('http://localhost:8080/get-job-detail', {
                params: {
                    description: description,
                    location: location,
                    full_time: fullTime,
                    page: page+1
                },
                withCredentials: true
            });
            console.log(response.data);
            setJobList([...jobList, ...response.data]);
            setPage(page+1);
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div style={{ backgroundColor: "grey", minHeight: "100vh" }}>
            <div className={`${style.header} pt-2 pb-2`}>
                <h1>GitHub Jobs</h1>
            </div>
            <div className='d-flex flex-row justify-content-center'>
                <div style={{ minWidth: "30vw" }}>
                    <p className='m-0'>Job Description</p>
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <div style={{ minWidth: "30vw" }}>
                    <p className='m-0'>Location</p>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                <div style={{ minWidth: "20vw" }} className="d-flex flex-row">
                    <p className='m-0' style={{ verticalAlign: "middle" }}>Full Time</p>
                    <input type="checkbox" checked={fullTime} onChange={(e) => setFullTime(e.target.checked)} />
                </div>
                <div style={{ minWidth: "20vw" }}>
                    <button className='btn btn-primary' onClick={() => handleSubmit() }>Search</button>
                </div>
            </div>
            {
                jobList.length > 0 ?
                <div style={{ backgroundColor: "white", borderColor: "black" }} className="mt-3">
                    {
                        jobList.map((job) => {
                            return (
                                <div key={job.id}>
                                    <h3>{job.title}</h3>
                                    <p>{job.company} - {job.type}</p>
                                </div>
                            )
                        })
                    }
                    <div className='d-flex justify-content-center'>
                        <button className='btn btn-primary w-75 mb-2' onClick={() => handleMoreJobs() }>More Jobs</button>
                    </div>
                </div>
                :
                null
            }
            {/* <div style={{ backgroundColor: "white", borderColor: "black" }} className="mt-3">
                {
                    jobList.length > 0 ?
                    jobList.map((job) => {
                        return (
                            <div>
                                <h3>{job.title}</h3>
                                <p>{job.company} - {job.type}</p>
                            </div>
                        )
                    })
                    :
                    null
                }
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary w-75 mb-2' onClick={() => handleMoreJobs() }>More Jobs</button>
                </div>
            </div> */}
        </div>
    )
}

export default JobList;