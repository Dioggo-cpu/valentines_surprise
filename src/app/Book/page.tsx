"use client";
import HTMLFlipBook from "react-pageflip";
import RainingHearts  from "../Components/RainingHearts";

const bookPages = [
  { title: "Gratitude", content: "Happy Valentine's Day, boo, thank you so much for being in my life, thank you for being my pillar and support throughout the year, thank you for motivating me everyday, you are what gets me up in the morning, getting to talk to, see you, hold you hand and hug you. You have been a blessing in my life, and having you by my side just gives me so much strength, even through the darkest times. Thank you sooo much boo. ❤️" },
  { title: "Tidal Moon", content: `You are the moon to my tides, pulling me up every day,
     A gentle force in my heart, guiding me along the way.

     Your light dances on my waves, calm in the stormy sea,
     A quiet glow in the night, whispering, 'Stay with me.' 
     
     No matter how far you seem, I feel your soft embrace,
     A love that rises and falls, yet never leaves its place.
     
     So even when darkness comes, and shadows dim the view,
     I'll always find my way back—forever drawn to you. 💖🌙` },
  { title: "Destiny", content: `Our souls tethered by an eternal bond,
    pulled to each other through inpentrable walls.
    
    The second we took a breath of the same air,
    My heart fluttered and curved like your beautiful hair.
    
    The thread unravels through space and time,
    weaving our love into each paradigm.

    So when the stars align and the heavens decree,
    I know that you were always meant for me.` },
  { title: "Always & Forever", content: `
    Forever with you is where I want to be,
    Wrapped in your arms, for all eternity.

    Your beauty gazes into my soul,
    crashing through my walls, making me whole.

    I'll love you always, with all my might,
    My heart is yours, day and night.

    Like crashing waves upon the shore,
    My love will never fade, forever more.
    ` },

];

export default function Book() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-pink-200 text-purple">
      <RainingHearts />
      <h1 className="text-4xl font-bold mb-6">❤️ Happy Valentine's Day ❤️</h1>

      {/* Flipbook Container */}
      <HTMLFlipBook
  width={400}
  height={500}
  className="shadow-2xl"
  style={{}} // ✅ Avoids the missing `style` error
  startPage={0}
  size="fixed"
  minWidth={300}
  maxWidth={800}
  minHeight={400}
  maxHeight={1000}
  drawShadow={true}
  flippingTime={600}
  usePortrait={true}
  startZIndex={0}
  autoSize={true}
  maxShadowOpacity={0.5}
  showCover={true}
  mobileScrollSupport={true}
  clickEventForward={true}
  useMouseEvents={true}
  swipeDistance={30}
  showPageCorners={true}
  disableFlipByClick={false}
>
        {/* Cover Page with Centered Text */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-purple text-white text-center py-48">
          <h2 className="text-3xl font-bold">This is for you boo 🥺</h2>
          <p className="text-lg mt-4">🥰 I love you sooo much 🥰</p>
        </div>

        {/* Book Content Pages (With Headings) */}
        {bookPages.map((page, index) => (
          <div
            key={index}
            className="w-full h-full flex flex-col items-center justify-center bg-white p-6 shadow-lg text-center"
          >
            <h2 className="text-2xl font-bold text-gray-800">{page.title}</h2>
            <p className={` ${index!=0 ? "text-sm font-serif" : "text-xl"} mt-4 text-justify text-black whitespace-pre-line`}>{page.content}</p>
          </div>
        ))}

        {/* Last Page */}
        <div className="w-full h-full flex flex-col items-center justify-center bg-purple  text-white text-center py-48">
          <h2 className="text-3xl font-bold">💖 The End 💖</h2>
          <p className="text-lg mt-4">I hope to be your forever 🥺</p>
        </div>
      </HTMLFlipBook>
    </div>
  );
}
