import inception from "../imgs/Inception.jpg";
import gameofthrones from "../imgs/gameofthrones.jpg";
import blackmirror from "../imgs/blackmirror.jpeg";
import breakingbad from "../imgs/breakingbad.jpg";
import forestgump from "../imgs/forestgump.jpg";
import friends from "../imgs/friends.jpg";
import gudfadern from "../imgs/gudfadern.jpg";
import pulpfiction from "../imgs/pulpfiction.jpeg";
import strangerthings from "../imgs/strangerthings.jpeg";
import thedarknight from "../imgs/thedarknight.jpg";
import thematrix from "../imgs/thematrix.jpeg";
import theoffice from "../imgs/theoffice.jpg";
import theshawshankredemption from "../imgs/theshawshankredemption.jpg";


export const tvshowData =  [
    {       id: 0,
            Name: "Game of Thrones",
            Genre: "Action, Adventure, Drama",
            Duration: "57 min",
            PremiereYear: 2011,
            ShortDescription: "Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.",
            Actors: ["Emilia Clarke", "Peter Dinklage", "Kit Harington"],
            Image: gameofthrones
    },
    {
            id: 1,
            Name: "Friends",
            Genre: "Comedy, Romance",
            Duration: "22 min",
            PremiereYear: 1994,
            ShortDescription: "Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.",
            Actors: ["Jennifer Aniston", "Courteney Cox", "Lisa Kudrow"],
            Image: friends
    },
    {
            id: 2,
            Name: "Black Mirror",
            Genre: "Drama, Sci-Fi, Thriller",
            Duration: "60 min",
            PremiereYear: 2011,
            ShortDescription: "An anthology series exploring a twisted, high-tech multiverse where humanity's greatest innovations and darkest instincts collide.",
            Actors: ["Daniel Lapaine", "Hannah John-Kamen", "Michaela Coel"],
            Image: blackmirror
    },
    {
            id: 3,
            Name: "Stranger Things",
            Genre: "Drama, Fantasy, Horror",
            Duration: "51 min",
            PremiereYear: 2016,
            ShortDescription: "When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.",
            Actors: ["Millie Bobby Brown", "Finn Wolfhard", "Winona Ryder"],
            Image: strangerthings
    }, 
    {
            id: 4,
            Name: "Breaking Bad",
            Genre: "Crime, Drama, Thriller",
            Duration: "49 min",
            PremiereYear: 2008,
            ShortDescription: "A high school chemistry teacher diagnosed with inoperable lung cancer turns to manufacturing and selling methamphetamine in order to secure his family's future.",
            Actors: ["Bryan Cranston", "Aaron Paul", "Anna Gunn"],
            Image: breakingbad
    },
    {
            id: 5,
            Name: "The Crown",
            Genre: "Biography, Drama, History",
            Duration: "58 min",
            PremiereYear: 2016,
            ShortDescription: "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
            Actors: ["Claire Foy", "Olivia Colman", "Imelda Staunton"],
            Image: breakingbad
    },
    {       id:  6,
            Name: "The Office (US)",
            Genre: "Comedy",
            Duration: "22 min",
            PremiereYear: 2005,
            ShortDescription: "A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.",
            Actors: ["Steve Carell", "Jenna Fischer", "John Krasinski"],
            Image: theoffice
    },
    {       id: 7,
            Name: "The Sopranos",
            Genre: "Crime, Drama",
            Duration: "55 min",
            PremiereYear: 1999,
            ShortDescription: "New Jersey mob boss Tony Soprano deals with personal and professional issues in his home and business life that affect his mental state, leading him to seek professional psychiatric counseling.",
            Actors: ["James Gandolfini", "Lorraine Bracco", "Edie Falco"],
            Image: breakingbad
    },
    {       id: 8,
            Name: "The Simpsons",
            Genre: "Animation, Comedy",
            Duration: "22 min",
            PremiereYear: 1989,
            ShortDescription: "The satiric adventures of a working-class family in the misfit city of Springfield.",
            Actors: ["Dan Castellaneta", "Nancy Cartwright", "Harry Shearer"],
            Image: breakingbad
    },
]

export const movieData = [
        {   id: 9,
            Name: "Inception",
            Genre: "Action, Adventure, Sci-Fi",
            Duration: "148 min",
            PremiereYear: 2010,
            ShortDescription: "A thief who enters the dreams of others to steal secrets from their subconscious.",
            Actors: ["Leonardo DiCaprio", "Joseph Gordon-Levitt", "Ellen Page"],
            Image: inception
        },
        {   id: 10,
            Name: "Pulp Fiction",
            Genre: "Crime, Drama",
            Duration: "154 min",
            PremiereYear: 1994,
            ShortDescription: "The lives of two mob hitmen, a boxer, a gangster's wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
            Actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
            Image: pulpfiction
        },
        {
            id: 11,
            Name: "The Godfather",
            Genre: "Crime, Drama",
            Duration: "175 min",
            PremiereYear: 1972,
            ShortDescription: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
            Actors: ["Marlon Brando", "Al Pacino", "James Caan"],
            Image: gudfadern
        },
        {   id: 12,
            Name: "The Dark Knight",
            Genre: "Action, Crime, Drama",
            Duration: "152 min",
            PremiereYear: 2008,
            ShortDescription: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
            Actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
            Image: thedarknight
        },
        {
            id: 13,
            Name: "Forrest Gump",
            Genre: "Drama, Romance",
            Duration: "142 min",
            PremiereYear: 1994,
            ShortDescription: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
            Actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
            Image: forestgump
        },
        {
            id: 14,
            Name: "The Shawshank Redemption",
            Genre: "Drama",
            Duration: "142 min",
            PremiereYear: 1994,
            ShortDescription: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
            Actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
            Image: theshawshankredemption
        },
        {
            id: 15,
            Name: "The Matrix",
            Genre: "Action, Sci-Fi",
            Duration: "136 min",
            PremiereYear: 1999,
            ShortDescription: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
            Actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
            Image: thematrix
        },
        {   id: 16,
            Name: "The Lord of the Rings Trilogy",
            Genre: "Action, Adventure, Drama",
            Duration: "558 min",
            PremiereYear: 2001,
            ShortDescription: "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.",
            Actors: ["Elijah Wood", "Ian McKellen", "Orlando Bloom"],
            Image: thematrix
        },
        {   id: 17,
            Name: "Harry Potter and the Philosopher's Stone",
            Genre: "Adventure, Family, Fantasy",
            Duration: "152 min",
            PremiereYear: 2001,
            ShortDescription: "An orphaned boy enrolls in a school of wizardry, where he learns the truth about himself, his family and the terrible evil that haunts the magical world.",
            Actors: ["Daniel Radcliffe", "Emma Watson", "Rupert Grint"],
            Image: breakingbad
        },
        {
            id: 18,
            Name: "Interstellar",
            Genre: "Adventure, Drama, Sci-Fi",
            Duration: "169 min",
            PremiereYear: 2014,
            ShortDescription: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
            Actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
            Image: inception
        },
        {   id: 19,
            Name: "Avengers: Endgame",
            Genre: "Action, Adventure, Sci-Fi",
            Duration: "181 min",
            PremiereYear: 2019,
            ShortDescription: "The Avengers assemble once more in order to reverse Thanos' actions and restore balance to the universe.",
            Actors: ["Robert Downey Jr.", "Chris Evans", "Scarlett Johansson"],
            Image: inception
        }
    ];


