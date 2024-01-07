"use client"

import { IconArrowRight, IconDeviceFloppy, IconPlus } from "@tabler/icons-react"
import Modal from 'react-modal';
import { useState } from "react"

export default function StoryOverview({ storyData }: { storyData: { id: string, name: string, description: string, file: string }[] }) {
    const [stories, setStories] = useState<typeof storyData>(storyData)
    const [newModal, setNewModal] = useState(false)
    const [previewModal, setPreviewModal] = useState<undefined | string>()
    const [story, setStory] = useState<{
        name: string
        description: string
        file: File | undefined
    }>({
        name: '',
        description: '',
        file: undefined
    })
    const refetch = async () => {
        const data = await (await fetch(`http://localhost:3000/api/story`)).json() as { id: string, name: string, description: string, file: string }[]
        setStories(data)
    }
    const saveStory = async () => {
        if (!story.file) return
        const reader = new FileReader()
        reader.readAsArrayBuffer(story.file)
        reader.onload = async (e) => {
            const data = e.target?.result as ArrayBuffer;
            const buff = Buffer.from(data)
            const res = await fetch(`http://localhost:3000/api/story`, {
                method: 'POST',
                body: JSON.stringify({
                    name: story.name,
                    description: story.description,
                    file: buff
                })
            })
            if (res.ok) setNewModal(false); setStory({ name: '', description: '', file: undefined }); refetch()
        }
    }
    return (<>
        <button className="bg-[#FFDF35] rounded-xl px-4 py-2 mb-8" onClick={() => setNewModal(true)}>
            <div className="flex items-center space-x-4">
                <h3 className="text-white font-extrabold uppercase">Upload</h3>
                <IconPlus className="text-white h-4 w-4" />
            </div>
        </button>
        <Modal isOpen={newModal} onRequestClose={() => setNewModal(false)} shouldCloseOnEsc style={{
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
            },
        }}>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col col-span-2">
                    <p className="uppercase text-sm font-bold mb-1">Name</p>
                    <input className="rounded-lg border border-[#FFDF35] px-4 py-1 text-sm outline-none" onChange={(e) => setStory({
                        ...story,
                        name: e.target.value
                    })}></input>
                </div>
                <div className="flex flex-col col-span-2">
                    <p className="uppercase text-sm font-bold mb-1">Description</p>
                    <textarea className="rounded-lg border border-[#FFDF35] px-4 py-1 text-sm outline-none" onChange={(e) => setStory({
                        ...story,
                        description: e.target.value
                    })}></textarea>
                </div>
                <div className="flex flex-col">
                    <p className="uppercase text-sm font-bold mb-1">File</p>
                    <input className="rounded-lg border border-[#FFDF35] px-4 py-1 text-sm outline-none" type="file" onChange={(e) => setStory({
                        ...story,
                        file: e.target.files![0]
                    })}></input>
                </div>
                <div className="flex flex-col flex-grow col-span-2">
                    <button className="bg-[#FFDF35] rounded-xl px-4 py-2 w-fit" onClick={() => saveStory()}>
                        <div className="flex items-center space-x-4">
                            <h3 className="text-white font-extrabold uppercase">Save</h3>
                            <IconDeviceFloppy className="text-white h-4 w-4" />
                        </div>
                    </button>
                </div>
            </div>
        </Modal>
        <Modal isOpen={previewModal != undefined} onRequestClose={() => setPreviewModal(undefined)} shouldCloseOnEsc>
            {previewModal &&
                <embed className="h-full w-full" src={`data:application/pdf;base64,${Buffer.from(previewModal).toString('base64')}`} id="pdf" />
            }
        </Modal>
        <div className="grid grid-cols-3 gap-4">
            {
                stories.map((s) => (<div key={s.id} className="rounded-lg bg-gradient-to-br from-[#FFDF35] to-[#00FFFF] px-8 py-8 flex flex-col space-y-2 text-white">
                    <h3 className="font-black uppercase text-4xl">{s.name}</h3>
                    <p className="text-sm uppercase">{s.description}</p>
                    <button className="bg-white rounded-xl px-4 py-2 w-fit hover:scale-105 transition duraiton-300 ease-in-out" onClick={() => setPreviewModal(s.file)}>
                        <div className="flex items-center space-x-4">
                            <h3 className="text-black font-extrabold uppercase">Play Now</h3>
                            <IconArrowRight className="text-black h-4 w-4" />
                        </div>
                    </button>
                </div>))
            }
        </div>
    </>)
}