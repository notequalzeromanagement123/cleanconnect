{/* Netlify 連携のお問い合わせフォーム */}
<section id="contact" className="max-w-xl mx-auto my-24">
  <h2 className="text-3xl font-bold mb-6 text-center">お問い合わせ</h2>

  <form name="contact" method="POST" data-netlify="true" className="space-y-4">
    {/* Netlify が解析する hidden フィールド */}
    <input type="hidden" name="form-name" value="contact" />

    <label className="block">
      <span className="block mb-1 font-semibold">お名前</span>
      <input type="text" name="name" required className="w-full border rounded p-2" />
    </label>

    <label className="block">
      <span className="block mb-1 font-semibold">メールアドレス</span>
      <input type="email" name="email" required className="w-full border rounded p-2" />
    </label>

    <label className="block">
      <span className="block mb-1 font-semibold">お問い合わせ内容</span>
      <textarea name="message" required rows={5} className="w-full border rounded p-2" />
    </label>

    <button type="submit" className="bg-blue-600 text-white rounded px-6 py-2 hover:bg-blue-700">
      送信
    </button>
  </form>
</section>
