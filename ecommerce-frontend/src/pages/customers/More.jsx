import { Helmet } from "react-helmet"

const More = () => {
  return (
    <>
      <Helmet>
        <title>GBA - उद्योगकता विकास अभियान - Gharguti Food</title>
        <meta name="description" content="Learn more about GBA - एक परिपूर्ण सर्वांगीण विकास केंद्र" />
      </Helmet>

      <div className="pt-24 w-full text-center p-5 bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-bold text-orange-600 mb-6">GBA - उद्योगकता विकास अभियान</h1>
        <p className="text-lg text-gray-700 mb-6">एक परिपूर्ण सर्वांगीण विकास केंद्र</p>

        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-orange-500 mb-4">सेवा आणि उपक्रम</h2>
          <ul className="list-disc list-inside text-gray-800 text-left space-y-3">
            <li>FB ग्रुप, व्हाट्सअप ग्रुप</li>
            <li>महिला उद्योग सक्षमीकरण</li>
            <li>बिझनेस नेटवर्किंग इव्हेंट</li>
            <li>रीजिस्टर्ड व्यवसायांच्या उत्पादन विक्रीसाठी ऑउटलेट्स</li>
            <li>प्रत्येक मुलामुलीला सोशल मीडिया वापरणे शिकवा</li>
            <li>पब्लिसिटी / डिजिटल मार्केटिंग</li>
            <li>यु-ट्यूब चॅनल</li>
            <li>GBA पॅनल (Work in Progress)</li>
            <li>सुलभ बचत / गुंतवणूक / मंडळ योजना</li>
            <li>डिजिटल मराठी माणूस (दरवर्षी)</li>
            <li>कोडिंग क्लासेस</li>
            <li>साहित्य क्लब - गाथा, बालकथा</li>
            <li>आप की फरमाइश - कार्यशाळा ऑर्गनायझेशन</li>
            <li>क्रिकेट आणि बॅडमिंटन स्पर्धा</li>
            <li>कश्मीर पर्यटन रेल्वे टूर</li>
            <li>सामाजिक भावनिक स्पंदन</li>
            <li>सामाजिक संस्थांना सहाय्य आणि आर्थिक मदत</li>
          </ul>
        </div>

        <div className="mt-6 text-gray-800">
          <p className="text-lg font-semibold">संस्थापक अध्यक्ष: डॉ. नीता दि. कुलकर्णी</p>
          <p className="text-lg">संपर्क क्रमांक: 9371009066</p>
        </div>
      </div>
    </>
  )
}

export default More
