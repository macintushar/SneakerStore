import React, { useState, useEffect } from 'react'; 
import '../index.css'


function QnA() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(0);


    async function GPTSubmit(e) {
        e.preventDefault();
        var doubt = document.getElementById('doubt').value; 
        document.getElementById('askBtn').disabled= true;
        document.getElementById('answer').style.visibility='visible';

        const answer = await FetchAnswer(doubt)
        
        setAnswer(answer);
    }

    function setAnswer(ans) {
        setData(ans);
        document.getElementById('GPTAnswer').style.visibility='visible';
        document.getElementById('answer').style.visibility='hidden';
        document.getElementById('askBtn').disabled = false;
    };

    async function FetchAnswer(doubts){
        var ansGPT = "Not Working";
        return ansGPT;
        }


    return(
        <>
        <main id="content" role="main" className="w-full max-w-3xl mx-auto">
            <div className="mt-7 bg-white rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <p>Have some doubts on what shoe to get? Want to know what shoes go best with your fit? </p>
                        <h1 className="block text-xl font-bold text-gray-800 dark:text-white">Ask ChatGPT, the fashion expert of tomorrow!</h1>
                        <div className="mt-5">
                            <form onSubmit={GPTSubmit} id="form">
                                <div className="grid gap-y-4">
                                    <div>
                                        <div className="relative">
                                            <input type="text" id="doubt" name="doubt" className="py-3 px-4 block w-full border-2 border-gray-200 rounded-md text-sm focus:border-green-500 focus:ring-green-500 shadow-sm" required aria-describedby="email-error" />
                                        </div>
                                    </div>
                                    <button type="submit" id='askBtn' className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800">
                                        Ask ChatGPT!
                                    </button>
                                    
                                    <div id='answer' style={{visibility:"hidden"}}>
                                        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                                            <span
                                                className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                                                    Loading...
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                </div>
            </div>
        </main>
        
        <main id="GPTAnswer" role="main" className="w-full max-w-3xl mx-auto" style={{visibility:"hidden"}}>
            <div className="mt-7 rounded-xl shadow-lg bg-gray-800 border-gray-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <p className='text-white'>{data}</p>
                    </div>
                </div>
            </div>
        </main>
    </>

    )
}

export default QnA;