import { getAllPosts } from '../program/posts.ts';
import { SuccessAlert, InfoAlert, DangerAlert, SpecialAlert, WarningAlert } from "../components/alert";

export async function fetchPosts({ notify, program,  setPosts, setFetchedPosts }) {
    // notify(
    //     <SuccessAlert
    //         text="Fetching Posts..."
    //     />
    // );
    let posts = []
    if (program) {
        try {
            posts = await getAllPosts({ program: program, filter: [] });
        } catch (e) {
            
            notify(
                <DangerAlert
                    text="An Error Occured while fetching posts..."
                />
            );
        }
    }
    posts = posts.sort(function (a, b) {
        return b.getTimestamp - a.getTimestamp
    });
    if (posts.length > 0) {
        setPosts(posts)
        setFetchedPosts(true)
    }
}