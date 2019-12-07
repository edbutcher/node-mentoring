function reverseSTDIN() {
  process.stdin.setEncoding('utf8');
  console.log('Enter something here to reverse it:');

  process.stdin.on('readable', () => {
    let chunk;

    while ((chunk = process.stdin.read()) !== null) {
      process.stdout.write(
        chunk
          .slice(0, chunk.length - 1)
          .split(/(?:)/u)
          .reverse()
          .join('')
          + '\n\n'
      );
    };
  });
};

export default reverseSTDIN;