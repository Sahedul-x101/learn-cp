/* ==========================================================================
   CP Roadmap - content
   Everything you read lives here. The page renders itself from these arrays,
   so this is the only file you need to edit to change the plan.
   ========================================================================== */

"use strict";

/* How to study: the rules that do most of the work. ------------------------ */
const GUIDE = [
  "Split each 2-hour session into about 40 minutes of reading and 80 minutes of solving. Problems, not videos, are what make you better.",
  "Type every solution yourself. Do not copy code, even when you understand it.",
  "Stuck ladder: 30 to 45 minutes alone, then a hint, then the editorial. Three days later, re-solve the problem from an empty file without looking.",
  "When a solution fails, stress test it: write a brute force and a random test generator, then compare answers on small inputs before you open the editorial.",
  "Finish a topic only when its \"Done when\" test is true and you can answer its recall questions out loud.",
  "Before starting a new phase, re-solve 2 problems from the previous phase from memory.",
  "From Phase 3 on, do one virtual Codeforces Div. 3 or Div. 4 contest per week. After Phase 4, join live contests. Always upsolve what you missed; that is where most improvement happens.",
  "The review queue in the Today panel schedules re-solves 3, 7 and 21 days after you finish a topic. Do them. Spacing is what makes the ideas stick."
];

/* The roadmap. ------------------------------------------------------------ */
const ROADMAP = [
  {
    phase: "Phase 1: C++ Foundations",
    short: "Foundations",
    goal: "Write, compile and run C++ programs with confidence, and handle the basic shapes of a problem: numbers, loops, arrays, strings.",
    milestone: "Solve CSES 1068, 1069, 1070, 1083 and 1094, plus 10 Codeforces problems rated 800. You should be able to open a simple problem and know where to start without hesitating.",
    checkpoint: {
      rule: "One hour in total, no hints, no editorial. Solve each one again from an empty file. Anything you cannot finish goes back on the review queue.",
      problems: [
        { site: "CSES", name: "Missing Number", url: "https://cses.fi/problemset/task/1083" },
        { site: "Codeforces", name: "263A. Beautiful Matrix", url: "https://codeforces.com/problemset/problem/263/A" },
        { site: "CSES", name: "Repetitions", url: "https://cses.fi/problemset/task/1069" }
      ]
    },
    topics: [
      {
        id: "t01",
        title: "Setup and first program",
        days: 2,
        summary: "Install a compiler and an editor, then compile and run a program that reads input and prints output.",
        prereq: "None",
        recall: [
          { q: "What command compiles main.cpp into a program called main, with warnings on?", a: "g++ -std=c++17 -O2 -Wall main.cpp -o main" },
          { q: "Which compiler message should you read first when a build fails?", a: "The first one. Later errors are usually consequences of the first." },
          { q: "Which two lines at the top of main() make input and output fast?", a: "ios::sync_with_stdio(false); and cin.tie(nullptr);" }
        ],
        subtopics: [
          "Install a C++ compiler (g++ via MinGW or MSYS2 on Windows, Xcode command line tools on macOS, build-essential on Linux)",
          "Install a code editor (VS Code is a good choice)",
          "Compile and run from the terminal",
          "Structure of a program: #include, main(), return 0",
          "Reading with cin and printing with cout",
          "Testing with a sample input file using input redirection"
        ],
        learn: [
          { label: "LearnCpp.com: intro and first sections on basics", url: "https://www.learncpp.com/" },
          { label: "USACO Guide: resources for learning to code (C++)", url: "https://usaco.guide/general/resources-learning-to-code" }
        ],
        practice: [
          { site: "CSES", name: "Weird Algorithm", url: "https://cses.fi/problemset/task/1068" },
          { site: "Codeforces", name: "4A. Watermelon", url: "https://codeforces.com/problemset/problem/4/A" }
        ],
        doneWhen: "You can compile and run a program that reads two numbers and prints their sum, without looking anything up.",
        mistake: "Reading the whole compiler output. Fix only the first error message, then recompile.",
        tip: "Compile with: g++ -std=c++17 -O2 -Wall main.cpp -o main"
      },
      {
        id: "t02",
        title: "Variables, data types and operators",
        days: 3,
        summary: "Store and compute values, and choose types so your numbers do not silently overflow.",
        prereq: "Setup and first program",
        recall: [
          { q: "Why and when do you use long long instead of int?", a: "int stops at about 2.1 billion. Use long long (about 9.2 * 10^18) whenever values or sums can get large." },
          { q: "For two ints, what are 7 / 2 and 7 % 2?", a: "3 and 1. Integer division truncates, it does not round." },
          { q: "What does (int) 3.9 give you?", a: "3. Casting truncates toward zero." }
        ],
        subtopics: [
          "int, long long, double, char, bool, string",
          "Integer overflow: int holds up to about 2.1 billion, so use long long for larger values",
          "Integer division (/) and remainder (%)",
          "Type casting",
          "Reading several values from one line"
        ],
        learn: [
          { label: "LearnCpp.com: variables, data types, operators", url: "https://www.learncpp.com/" },
          { label: "cppreference: fundamental types", url: "https://en.cppreference.com/w/cpp/language/types" }
        ],
        practice: [
          { site: "Codeforces", name: "617A. Elephant", url: "https://codeforces.com/problemset/problem/617/A" },
          { site: "Codeforces", name: "50A. Domino piling", url: "https://codeforces.com/problemset/problem/50/A" },
          { site: "Codeforces", name: "546A. Soldier and Bananas", url: "https://codeforces.com/problemset/problem/546/A" },
          { site: "Codeforces", name: "1A. Theatre Square", url: "https://codeforces.com/problemset/problem/1/A" }
        ],
        doneWhen: "You know when long long is required and you can solve 3 of the 4 problems above without help.",
        mistake: "Using int when values or sums can reach 10^9 or more. Overflow gives a wrong answer, not a crash, so it is easy to miss."
      },
      {
        id: "t03",
        title: "Conditions and loops",
        days: 4,
        summary: "Make decisions and repeat work. Almost every problem is built from these two ideas.",
        prereq: "Variables, data types and operators",
        recall: [
          { q: "How many times does for (int i = 0; i < n; i++) run, and what is the last value of i?", a: "n times, with i ending at n - 1." },
          { q: "What is the difference between = and == ?", a: "= assigns a value, == compares two values. Using = inside an if is a classic silent bug." },
          { q: "break versus continue?", a: "break leaves the loop immediately; continue skips to the next iteration." }
        ],
        subtopics: [
          "if, else if, else",
          "Comparison and logical operators (==, !=, <, &&, ||, !)",
          "for and while loops",
          "break and continue",
          "Nested loops"
        ],
        learn: [
          { label: "LearnCpp.com: control flow", url: "https://www.learncpp.com/" }
        ],
        practice: [
          { site: "Codeforces", name: "231A. Team", url: "https://codeforces.com/problemset/problem/231/A" },
          { site: "Codeforces", name: "158A. Next Round", url: "https://codeforces.com/problemset/problem/158/A" },
          { site: "Codeforces", name: "282A. Bit++", url: "https://codeforces.com/problemset/problem/282/A" },
          { site: "Codeforces", name: "791A. Bear and Big Brother", url: "https://codeforces.com/problemset/problem/791/A" },
          { site: "CSES", name: "Repetitions", url: "https://cses.fi/problemset/task/1069" },
          { site: "CSES", name: "Increasing Array", url: "https://cses.fi/problemset/task/1094" }
        ],
        doneWhen: "You can solve an 800-rated problem that needs one or two loops in under 30 minutes.",
        mistake: "Off-by-one errors in loop bounds. Check the first and the last iteration by hand."
      },
      {
        id: "t04",
        title: "Functions",
        days: 3,
        summary: "Split code into reusable pieces, and understand how values move in and out of a function.",
        prereq: "Conditions and loops",
        recall: [
          { q: "Pass by value versus pass by reference?", a: "By value copies the argument, so changes are lost. With & the function works on the caller's variable and can change it." },
          { q: "Why write const string& instead of string for a large argument?", a: "No copy, so it is fast, and const stops the function from changing it by accident." },
          { q: "What does a void function return?", a: "Nothing. You call it for its side effects." }
        ],
        subtopics: [
          "Defining and calling functions",
          "Return types and void",
          "Pass by value versus pass by reference (&)",
          "const references",
          "Local versus global variables"
        ],
        learn: [
          { label: "LearnCpp.com: functions", url: "https://www.learncpp.com/" },
          { label: "cppreference: functions", url: "https://en.cppreference.com/w/cpp/language/functions" }
        ],
        practice: [
          { site: "Codeforces", name: "734A. Anton and Danik", url: "https://codeforces.com/problemset/problem/734/A" },
          { site: "Codeforces", name: "677A. Vanya and Fence", url: "https://codeforces.com/problemset/problem/677/A" },
          { site: "CSES", name: "Missing Number", url: "https://cses.fi/problemset/task/1083" },
          { site: "CSES", name: "Permutations", url: "https://cses.fi/problemset/task/1070" }
        ],
        doneWhen: "You can explain pass by value versus pass by reference, and you have rewritten two earlier solutions so each uses at least one function.",
        mistake: "Passing large data by value (slow), or forgetting the & when the function must change its argument."
      },
      {
        id: "t05",
        title: "Arrays and strings",
        days: 4,
        summary: "Store many values and work with text. Most problem inputs are arrays or strings.",
        prereq: "Functions",
        recall: [
          { q: "Which indices are valid for int a[n]?", a: "0 to n - 1. a[n] is out of bounds and is undefined behaviour." },
          { q: "How do you read a whole line that contains spaces?", a: "getline(cin, s). If you used cin >> before it, consume the leftover newline first." },
          { q: "How do you turn a lowercase letter into 0 to 25?", a: "c - 'a'." }
        ],
        subtopics: [
          "1D and 2D arrays",
          "Indexing starts at 0",
          "std::string: length, indexing, substr, +=, comparison",
          "Reading a full line with getline",
          "Character arithmetic (for example c - 'a')"
        ],
        learn: [
          { label: "cppreference: std::basic_string", url: "https://en.cppreference.com/w/cpp/string/basic_string" },
          { label: "LearnCpp.com: arrays and strings", url: "https://www.learncpp.com/" }
        ],
        practice: [
          { site: "Codeforces", name: "281A. Word Capitalization", url: "https://codeforces.com/problemset/problem/281/A" },
          { site: "Codeforces", name: "112A. Petya and Strings", url: "https://codeforces.com/problemset/problem/112/A" },
          { site: "Codeforces", name: "118A. String Task", url: "https://codeforces.com/problemset/problem/118/A" },
          { site: "Codeforces", name: "339A. Helpful Maths", url: "https://codeforces.com/problemset/problem/339/A" },
          { site: "Codeforces", name: "236A. Boy or Girl", url: "https://codeforces.com/problemset/problem/236/A" },
          { site: "Codeforces", name: "263A. Beautiful Matrix", url: "https://codeforces.com/problemset/problem/263/A" }
        ],
        doneWhen: "You can solve 5 of the 6 problems above, and you can loop over a string and a 2D array without index mistakes.",
        mistake: "Reading past the end of an array (index n instead of n - 1), and swapping rows and columns in a 2D array."
      }
    ]
  },

  {
    phase: "Phase 2: STL and Complexity",
    short: "STL",
    goal: "Use C++'s built-in tools, and judge whether a solution is fast enough before you write it.",
    milestone: "Solve 8 problems from the CSES \"Sorting and Searching\" section. You can explain O(n), O(n log n) and O(n^2) with examples of your own.",
    checkpoint: {
      rule: "Three problems, 45 minutes each, mixed together so you have to choose the technique yourself. No hints, no old code.",
      problems: [
        { site: "CSES", name: "Ferris Wheel", url: "https://cses.fi/problemset/task/1090" },
        { site: "CSES", name: "Restaurant Customers", url: "https://cses.fi/problemset/task/1619" },
        { site: "Codeforces", name: "230B. T-primes", url: "https://codeforces.com/problemset/problem/230/B" }
      ]
    },
    topics: [
      {
        id: "t06",
        title: "Time complexity",
        days: 2,
        summary: "Estimate how fast a solution will be from the input limits, before writing a line of code.",
        prereq: "Arrays and strings",
        recall: [
          { q: "Roughly how many simple operations does a judge allow per second?", a: "About 10^8. Use that to convert limits into a required complexity." },
          { q: "n is up to 200000. How many operations is an O(n^2) solution, and does it pass?", a: "About 4 * 10^10, so no. Aim for O(n) or O(n log n)." },
          { q: "Why read the constraints before the problem statement?", a: "They tell you which complexity is required, and that usually decides the algorithm." }
        ],
        subtopics: [
          "What O(n), O(n log n) and O(n^2) mean",
          "Rule of thumb: about 10^8 simple operations per second",
          "Reading the constraints to choose a method",
          "Space (memory) usage basics"
        ],
        learn: [
          { label: "USACO Guide: Time Complexity", url: "https://usaco.guide/bronze/time-comp" }
        ],
        practice: [
          { site: "CSES", name: "Distinct Numbers (first write an O(n^2) solution, watch it time out, then fix it)", url: "https://cses.fi/problemset/task/1621" },
          { site: "CSES", name: "Maximum Subarray Sum (compare brute force with a linear solution)", url: "https://cses.fi/problemset/task/1643" }
        ],
        doneWhen: "Given n up to 200000, you can say whether an O(n^2) solution will pass (it will not) and which complexity to aim for instead.",
        mistake: "Writing code before checking the constraints. A correct but slow solution still fails."
      },
      {
        id: "t07",
        title: "vector, pair and sort",
        days: 4,
        summary: "Resizable arrays, pairs and sorting. These appear in a large share of all problems.",
        prereq: "Time complexity",
        recall: [
          { q: "Difference between push_back and resize?", a: "push_back appends one element; resize(n) sets the size and fills new slots with defaults." },
          { q: "What must a comparator return for two equal elements?", a: "false. Write a < b, never a <= b, or sort can crash." },
          { q: "How do you sort pairs by their second value?", a: "sort(v.begin(), v.end(), [](auto& a, auto& b) { return a.second < b.second; });" }
        ],
        subtopics: [
          "vector: push_back, size, indexing, resize, iteration, 2D vectors",
          "pair and tuple",
          "sort with the default order and with a lambda comparator",
          "Sorting pairs by the second value",
          "reverse, min, max, max_element"
        ],
        learn: [
          { label: "cppreference: std::vector", url: "https://en.cppreference.com/w/cpp/container/vector" },
          { label: "cppreference: std::sort", url: "https://en.cppreference.com/w/cpp/algorithm/sort" }
        ],
        practice: [
          { site: "Codeforces", name: "144A. Arrival of the General", url: "https://codeforces.com/problemset/problem/144/A" },
          { site: "Codeforces", name: "160A. Twins", url: "https://codeforces.com/problemset/problem/160/A" },
          { site: "CSES", name: "Apartments", url: "https://cses.fi/problemset/task/1084" },
          { site: "CSES", name: "Ferris Wheel", url: "https://cses.fi/problemset/task/1090" }
        ],
        doneWhen: "You can sort pairs by their second value with a lambda without looking up the syntax.",
        mistake: "A comparator that returns true for equal elements (a <= b). This can crash sort."
      },
      {
        id: "t08",
        title: "set, map, stack, queue and priority_queue",
        days: 5,
        summary: "Pick the right container for the job. Fast lookup and ordering turn many problems from hard into routine.",
        prereq: "vector, pair and sort",
        recall: [
          { q: "What does m[x] do when x is not in the map?", a: "It inserts x with a default value. Use count() or find() to test membership." },
          { q: "Why does the roadmap prefer map over unordered_map on Codeforces?", a: "unordered_map has a worst case of O(n) and can be attacked with colliding keys in hacks; map stays O(log n)." },
          { q: "How do you get a min-heap out of priority_queue?", a: "priority_queue<int, vector<int>, greater<int>>." }
        ],
        subtopics: [
          "set and multiset (insert, erase, find, lower_bound)",
          "map and unordered_map (prefer map on Codeforces)",
          "stack, queue and deque",
          "priority_queue (max-heap by default, min-heap with greater<>)",
          "The time cost of each operation"
        ],
        learn: [
          { label: "cppreference: std::set", url: "https://en.cppreference.com/w/cpp/container/set" },
          { label: "cppreference: std::map", url: "https://en.cppreference.com/w/cpp/container/map" },
          { label: "cppreference: std::priority_queue", url: "https://en.cppreference.com/w/cpp/container/priority_queue" }
        ],
        practice: [
          { site: "Codeforces", name: "43A. Football", url: "https://codeforces.com/problemset/problem/43/A" },
          { site: "Codeforces", name: "4C. Registration System", url: "https://codeforces.com/problemset/problem/4/C" },
          { site: "CSES", name: "Concert Tickets", url: "https://cses.fi/problemset/task/1091" },
          { site: "CSES", name: "Restaurant Customers", url: "https://cses.fi/problemset/task/1619" },
          { site: "CSES", name: "Playlist", url: "https://cses.fi/problemset/task/1141" },
          { site: "CSES", name: "Nearest Smaller Values", url: "https://cses.fi/problemset/task/1645" }
        ],
        doneWhen: "For a new task you can choose between vector, set, map and priority_queue, and state the cost of each operation you use.",
        mistake: "Using map[key] just to check whether a key exists. It creates the key."
      },
      {
        id: "t09",
        title: "Math essentials",
        days: 6,
        summary: "The small set of number theory and counting tools that show up again and again in contests.",
        prereq: "Time complexity",
        recall: [
          { q: "Why take the modulo after every multiplication?", a: "The intermediate value would overflow. Reduce at each step, and add the modulus when a subtraction goes negative." },
          { q: "How fast is a sieve up to n?", a: "O(n log log n), which is close enough to linear." },
          { q: "How do you test whether one number is prime in O(sqrt n)?", a: "Trial-divide by i = 2, 3, 4 ... while i * i <= n." },
          { q: "How do you compute nCr modulo 1e9+7 when n is up to 10^6?", a: "Precompute fact[] and invfact[] up to n, then nCr = fact[n] * invfact[r] * invfact[n - r] mod p." }
        ],
        subtopics: [
          "Modulo arithmetic and the 1000000007 modulus",
          "gcd and lcm",
          "Primality test in O(sqrt n)",
          "Sieve of Eratosthenes",
          "Fast exponentiation",
          "Counting divisors",
          "Binomial coefficients: Pascal's triangle for small n, factorials plus modular inverse for large n",
          "Modular inverse (awareness only)"
        ],
        learn: [
          { label: "CP-Algorithms: Euclidean algorithm (GCD)", url: "https://cp-algorithms.com/algebra/euclid-algorithm.html" },
          { label: "CP-Algorithms: Sieve of Eratosthenes", url: "https://cp-algorithms.com/algebra/sieve-of-eratosthenes.html" },
          { label: "CP-Algorithms: Binary exponentiation", url: "https://cp-algorithms.com/algebra/binary-exp.html" },
          { label: "CP-Algorithms: Binomial coefficients", url: "https://cp-algorithms.com/combinatorics/binomial-coefficients.html" },
          { label: "CP-Algorithms: Modular inverse", url: "https://cp-algorithms.com/algebra/module-inverse.html" }
        ],
        practice: [
          { site: "Codeforces", name: "230B. T-primes", url: "https://codeforces.com/problemset/problem/230/B" },
          { site: "CSES", name: "Trailing Zeros", url: "https://cses.fi/problemset/task/1618" },
          { site: "CSES", name: "Exponentiation", url: "https://cses.fi/problemset/task/1095" },
          { site: "CSES", name: "Counting Divisors", url: "https://cses.fi/problemset/task/1713" },
          { site: "CSES", name: "Binomial Coefficients", url: "https://cses.fi/problemset/task/1079" }
        ],
        doneWhen: "You can write gcd, a sieve, fast power and nCr from memory, and apply the modulo correctly.",
        mistake: "Forgetting the modulo after each multiplication, and getting negative remainders after a subtraction."
      }
    ]
  },

  {
    phase: "Phase 3: Core Techniques",
    short: "Techniques",
    goal: "Learn the problem-solving patterns behind most beginner and intermediate problems.",
    milestone: "Take part in 2 Codeforces virtual contests (Div. 3 or Div. 4) and upsolve every problem you could not solve. Working code matters less than naming the right technique quickly.",
    checkpoint: {
      rule: "Three problems, 60 minutes each, with no topic labels. If the right technique does not occur to you in the first 5 minutes, skip it and come back after a review session.",
      problems: [
        { site: "CSES", name: "Factory Machines", url: "https://cses.fi/problemset/task/1620" },
        { site: "CSES", name: "Subarray Sums II", url: "https://cses.fi/problemset/task/1661" },
        { site: "CSES", name: "Chessboard and Queens", url: "https://cses.fi/problemset/task/1624" }
      ]
    },
    topics: [
      {
        id: "t10",
        title: "Binary search",
        days: 4,
        summary: "Search a sorted array in O(log n), and binary search on the answer to solve \"smallest x that works\" problems.",
        prereq: "vector, pair and sort",
        recall: [
          { q: "Why write mid = lo + (hi - lo) / 2 instead of (lo + hi) / 2?", a: "It cannot overflow, and it always stays inside the range." },
          { q: "When is binary search on the answer valid?", a: "When the check is monotone: if x works, every larger (or every smaller) x works too." },
          { q: "lower_bound versus upper_bound?", a: "First element >= x versus first element > x. Their difference counts the copies of x." }
        ],
        subtopics: [
          "Binary search on a sorted array",
          "lower_bound and upper_bound",
          "Binary search on the answer with a check() function",
          "Choosing bounds and keeping the loop invariant clear"
        ],
        learn: [
          { label: "CP-Algorithms: Binary search", url: "https://cp-algorithms.com/num_methods/binary_search.html" },
          { label: "USACO Guide: Binary Search", url: "https://usaco.guide/silver/binary-search" }
        ],
        practice: [
          { site: "Codeforces", name: "706B. Interesting Drink", url: "https://codeforces.com/problemset/problem/706/B" },
          { site: "Codeforces", name: "492B. Vanya and Lanterns", url: "https://codeforces.com/problemset/problem/492/B" },
          { site: "CSES", name: "Factory Machines", url: "https://cses.fi/problemset/task/1620" },
          { site: "CSES", name: "Array Division", url: "https://cses.fi/problemset/task/1085" }
        ],
        doneWhen: "You can write binary search on the answer with a check() function and explain why it works.",
        mistake: "Infinite loops from sloppy bounds. Decide what lo and hi mean before you write the loop."
      },
      {
        id: "t11",
        title: "Prefix sums and two pointers",
        days: 4,
        summary: "Answer range queries in O(1), and scan an array in one pass with two moving indices.",
        prereq: "Binary search",
        recall: [
          { q: "How do you define pre[] so that the sum of [l, r) is a single subtraction?", a: "pre[i] is the sum of the first i elements, so the answer is pre[r] - pre[l]." },
          { q: "When is a two-pointer window valid?", a: "When moving the right end forward never requires the left end to move backward." },
          { q: "How do you count subarrays with a given sum k?", a: "Keep prefix sums in a map, and for each prefix p add the number of earlier prefixes equal to p - k." }
        ],
        subtopics: [
          "1D prefix sums and range sum queries",
          "Prefix sums with a map (counting subarrays with a given sum)",
          "2D prefix sums (basic)",
          "Two pointers on sorted arrays",
          "Sliding window"
        ],
        learn: [
          { label: "USACO Guide: Two Pointers", url: "https://usaco.guide/silver/two-pointers" },
          { label: "USACO Guide: Introduction to Prefix Sums", url: "https://usaco.guide/silver/prefix-sums" }
        ],
        practice: [
          { site: "Codeforces", name: "279B. Books", url: "https://codeforces.com/problemset/problem/279/B" },
          { site: "CSES", name: "Sum of Two Values", url: "https://cses.fi/problemset/task/1640" },
          { site: "CSES", name: "Subarray Sums I", url: "https://cses.fi/problemset/task/1660" },
          { site: "CSES", name: "Subarray Sums II", url: "https://cses.fi/problemset/task/1661" }
        ],
        doneWhen: "You can answer 100000 range-sum queries in O(1) each, and say when a sliding window is valid.",
        mistake: "Off-by-one prefix indices. Write pre[i] as \"sum of the first i elements\" and check it on a tiny example."
      },
      {
        id: "t12",
        title: "Recursion, backtracking and bitmasks",
        days: 5,
        summary: "Try every possibility in an organized way when the input is small.",
        prereq: "Functions",
        recall: [
          { q: "Which two parts must every recursive function have?", a: "A base case that stops, and a recursive case that makes the problem smaller." },
          { q: "What does 1 << i mean?", a: "The mask with only bit i set, that is 2^i." },
          { q: "Why undo a change after the recursive call?", a: "So the next branch starts from the same state. That is what backtracking means." }
        ],
        subtopics: [
          "Base case and recursive case",
          "Generating subsets and permutations",
          "Backtracking with pruning",
          "Bitmask basics (1 << i, &, |, ^)",
          "next_permutation"
        ],
        learn: [
          { label: "LearnCpp.com: recursion", url: "https://www.learncpp.com/" },
          { label: "USACO Guide: Complete Search with Recursion", url: "https://usaco.guide/bronze/complete-rec" }
        ],
        practice: [
          { site: "CSES", name: "Bit Strings", url: "https://cses.fi/problemset/task/1617" },
          { site: "CSES", name: "Tower of Hanoi", url: "https://cses.fi/problemset/task/2165" },
          { site: "CSES", name: "Apple Division", url: "https://cses.fi/problemset/task/1623" },
          { site: "CSES", name: "Creating Strings", url: "https://cses.fi/problemset/task/1622" },
          { site: "CSES", name: "Gray Code", url: "https://cses.fi/problemset/task/2205" },
          { site: "CSES", name: "Chessboard and Queens", url: "https://cses.fi/problemset/task/1624" }
        ],
        doneWhen: "You can write a recursive function that generates all subsets of a small set, and a second version using bitmasks.",
        mistake: "A missing base case, or forgetting to undo a change after the recursive call."
      },
      {
        id: "t13",
        title: "Greedy algorithms",
        days: 5,
        summary: "Make the best local choice at each step, and learn how to check that the choice is safe.",
        prereq: "vector, pair and sort",
        recall: [
          { q: "What is the cheapest way to test a greedy idea?", a: "Write a brute force, run both on random small inputs, and compare the outputs." },
          { q: "Interval scheduling: what do you sort by?", a: "End time. Then take every interval that starts after the last chosen end." },
          { q: "When does greedy fail?", a: "When a locally best choice blocks a better combination later, for example coin change with arbitrary coin values." }
        ],
        subtopics: [
          "Sort first, then pick",
          "Exchange argument (why a greedy choice is correct)",
          "Interval scheduling",
          "When greedy fails and dynamic programming is needed"
        ],
        learn: [
          { label: "USACO Guide: Greedy Algorithms with Sorting", url: "https://usaco.guide/silver/greedy-sorting" }
        ],
        practice: [
          { site: "CSES", name: "Coin Piles", url: "https://cses.fi/problemset/task/1754" },
          { site: "CSES", name: "Palindrome Reorder", url: "https://cses.fi/problemset/task/1755" },
          { site: "CSES", name: "Stick Lengths", url: "https://cses.fi/problemset/task/1074" },
          { site: "CSES", name: "Movie Festival", url: "https://cses.fi/problemset/task/1629" },
          { site: "CSES", name: "Tasks and Deadlines", url: "https://cses.fi/problemset/task/1630" },
          { site: "CSES", name: "Reading Books", url: "https://cses.fi/problemset/task/1631" }
        ],
        doneWhen: "For each problem above you can explain in one sentence why the greedy choice is safe.",
        mistake: "Trusting a greedy idea without testing it."
      }
    ]
  },

  {
    phase: "Phase 4: Dynamic Programming and Graphs",
    short: "DP & graphs",
    goal: "Learn the topics behind most intermediate problems: dynamic programming, graph traversal, shortest paths and trees.",
    milestone: "Solve 15 problems from the CSES \"Dynamic Programming\" and \"Graph Algorithms\" sections, plus 5 from \"Tree Algorithms\", then join live Codeforces Div. 3 contests regularly.",
    checkpoint: {
      rule: "Three problems, 75 minutes each, from an empty file. This is the closest thing in the roadmap to a real contest, so time yourself.",
      problems: [
        { site: "CSES", name: "Removing Digits", url: "https://cses.fi/problemset/task/1637" },
        { site: "CSES", name: "Monsters", url: "https://cses.fi/problemset/task/1194" },
        { site: "CSES", name: "Shortest Routes I", url: "https://cses.fi/problemset/task/1671" }
      ]
    },
    topics: [
      {
        id: "t14",
        title: "Dynamic programming basics",
        days: 10,
        summary: "Solve a big problem by solving and reusing smaller ones. This is the topic to spend the most time on.",
        prereq: "Recursion, backtracking and bitmasks; Greedy algorithms",
        recall: [
          { q: "What four things do you write down before coding a DP?", a: "The meaning of the state, the transition, the base case, and where the final answer sits." },
          { q: "Memoization versus tabulation?", a: "Top-down recursion with a cache versus bottom-up loops in dependency order." },
          { q: "Why do Coin Combinations I and II need different loop orders?", a: "The loop order decides whether different orderings of the same coins count as different answers." }
        ],
        subtopics: [
          "State, transition and base case",
          "Memoization (top-down) and tabulation (bottom-up)",
          "1D DP (coins, counting ways)",
          "Grid DP",
          "0/1 knapsack",
          "Counting versus optimizing"
        ],
        learn: [
          { label: "CP-Algorithms: Introduction to dynamic programming", url: "https://cp-algorithms.com/dynamic_programming/intro-to-dp.html" },
          { label: "USACO Guide: Introduction to DP", url: "https://usaco.guide/gold/intro-dp" }
        ],
        practice: [
          { site: "CSES", name: "Dice Combinations", url: "https://cses.fi/problemset/task/1633" },
          { site: "CSES", name: "Minimizing Coins", url: "https://cses.fi/problemset/task/1634" },
          { site: "CSES", name: "Coin Combinations I", url: "https://cses.fi/problemset/task/1635" },
          { site: "CSES", name: "Coin Combinations II", url: "https://cses.fi/problemset/task/1636" },
          { site: "CSES", name: "Removing Digits", url: "https://cses.fi/problemset/task/1637" },
          { site: "CSES", name: "Grid Paths", url: "https://cses.fi/problemset/task/1638" },
          { site: "CSES", name: "Book Shop", url: "https://cses.fi/problemset/task/1158" }
        ],
        doneWhen: "For a new DP problem you write the state, the transition, the base case and the position of the answer before you write code.",
        mistake: "A vague state. Write \"dp[i] = ...\" in words first. Also forgetting the modulo."
      },
      {
        id: "t15",
        title: "Graphs: BFS, DFS and grids",
        days: 9,
        summary: "Model problems as nodes and edges, then explore them. A grid is a graph too.",
        prereq: "set, map, stack, queue and priority_queue",
        recall: [
          { q: "How much memory does an adjacency list use for n nodes and m edges?", a: "O(n + m)." },
          { q: "Which traversal gives shortest paths in an unweighted graph?", a: "BFS. DFS does not." },
          { q: "When do you mark a node visited in BFS?", a: "When you push it into the queue, not when you pop it." }
        ],
        subtopics: [
          "Adjacency list",
          "DFS (watch the recursion depth)",
          "BFS and shortest path in an unweighted graph",
          "Connected components",
          "Grid as a graph (4 directions)",
          "Cycle detection and bipartite check (basic)",
          "Topological sort with Kahn's algorithm (in-degree queue)"
        ],
        learn: [
          { label: "CP-Algorithms: Breadth-first search", url: "https://cp-algorithms.com/graph/breadth-first-search.html" },
          { label: "CP-Algorithms: Depth-first search", url: "https://cp-algorithms.com/graph/depth-first-search.html" },
          { label: "USACO Guide: Graph Traversal", url: "https://usaco.guide/silver/graph-traversal" }
        ],
        practice: [
          { site: "CSES", name: "Counting Rooms", url: "https://cses.fi/problemset/task/1192" },
          { site: "CSES", name: "Building Roads", url: "https://cses.fi/problemset/task/1666" },
          { site: "CSES", name: "Message Route", url: "https://cses.fi/problemset/task/1667" },
          { site: "CSES", name: "Labyrinth", url: "https://cses.fi/problemset/task/1193" },
          { site: "CSES", name: "Building Teams", url: "https://cses.fi/problemset/task/1668" },
          { site: "CSES", name: "Round Trip", url: "https://cses.fi/problemset/task/1669" },
          { site: "CSES", name: "Monsters", url: "https://cses.fi/problemset/task/1194" },
          { site: "CSES", name: "Course Schedule", url: "https://cses.fi/problemset/task/1679" }
        ],
        doneWhen: "You can write BFS and DFS from memory, use BFS to find a shortest path on a grid, and produce a topological order of a DAG.",
        mistake: "Marking a node visited when you pop it instead of when you push it (BFS), and mixing 0-indexed with 1-indexed nodes."
      },
      {
        id: "t16",
        title: "Shortest paths: Dijkstra",
        days: 5,
        summary: "Find shortest paths when the edges have weights.",
        prereq: "Graphs: BFS, DFS and grids",
        recall: [
          { q: "Why does Dijkstra fail with negative edges?", a: "It finalises a node on the first pop, but a later negative edge could still improve the distance. Use Bellman-Ford instead." },
          { q: "Which container drives Dijkstra, and why?", a: "A min-heap priority_queue, so you always expand the closest unfinalised node." },
          { q: "Why skip outdated priority queue entries?", a: "The same node is pushed many times with old, larger distances. Skipping keeps the loop honest." }
        ],
        subtopics: [
          "Weighted graphs",
          "Dijkstra with a priority_queue (min-heap)",
          "Distance array with a large INF value (use long long)",
          "Path reconstruction",
          "Negative edges need Bellman-Ford instead (awareness only)"
        ],
        learn: [
          { label: "CP-Algorithms: Dijkstra", url: "https://cp-algorithms.com/graph/dijkstra.html" },
          { label: "USACO Guide: Introduction to Shortest Paths", url: "https://usaco.guide/gold/shortest-paths" }
        ],
        practice: [
          { site: "CSES", name: "Shortest Routes I", url: "https://cses.fi/problemset/task/1671" },
          { site: "CSES", name: "Flight Discount", url: "https://cses.fi/problemset/task/1195" },
          { site: "CSES", name: "Flight Routes", url: "https://cses.fi/problemset/task/1196" }
        ],
        doneWhen: "You can write Dijkstra from memory and explain why it fails with negative edges.",
        mistake: "Using int for distances (overflow), and never skipping stale entries popped from the queue."
      },
      {
        id: "t17",
        title: "Disjoint Set Union (Union-Find)",
        days: 4,
        summary: "Track which nodes are connected while edges are added. Short to code and very useful.",
        prereq: "Graphs: BFS, DFS and grids",
        recall: [
          { q: "What does path compression do?", a: "It points nodes straight at the root, flattening the tree, so later finds are nearly O(1)." },
          { q: "Why union by size?", a: "Attaching the smaller tree under the larger root keeps the depth logarithmic." },
          { q: "How do you count components while edges arrive?", a: "Start at n and decrease the counter on every union of two different roots." }
        ],
        subtopics: [
          "find with path compression",
          "union by size",
          "Counting components as edges are added",
          "Kruskal's minimum spanning tree (basic idea)"
        ],
        learn: [
          { label: "CP-Algorithms: Disjoint Set Union", url: "https://cp-algorithms.com/data_structures/disjoint_set_union.html" },
          { label: "USACO Guide: Disjoint Set Union", url: "https://usaco.guide/gold/dsu" }
        ],
        practice: [
          { site: "CSES", name: "Road Construction", url: "https://cses.fi/problemset/task/1676" },
          { site: "CSES", name: "Road Reparation", url: "https://cses.fi/problemset/task/1675" }
        ],
        doneWhen: "You can write DSU with path compression and union by size from memory, and use it to count components.",
        mistake: "Forgetting to union the roots (not the nodes), or skipping path compression."
      },
      {
        id: "t18",
        title: "Trees: subtree sizes and diameter",
        days: 6,
        summary: "Root a tree, walk it with DFS, and answer the two questions that come up constantly: how big is each subtree, and how far apart are the two farthest nodes.",
        prereq: "Graphs: BFS, DFS and grids",
        recall: [
          { q: "How do you stop a DFS on a tree from walking back into its parent?", a: "Pass the parent into the call and skip it, or keep a visited array. On a tree the parent check is enough." },
          { q: "What is the subtree size of a node?", a: "1 plus the subtree sizes of its children, added after each child's DFS returns." },
          { q: "How do you find a tree's diameter?", a: "Traverse from any node to its farthest node A, then from A to its farthest node B. The path from A to B is a diameter." }
        ],
        subtopics: [
          "Adjacency list for a tree, rooted at node 1",
          "parent and depth arrays",
          "DFS entry and exit order",
          "Subtree sizes and counting descendants",
          "Tree diameter in two traversals",
          "LCA with binary lifting (awareness only)"
        ],
        learn: [
          { label: "USACO Guide: Introduction to Trees", url: "https://usaco.guide/silver/intro-tree" },
          { label: "CP-Algorithms: Depth-first search", url: "https://cp-algorithms.com/graph/depth-first-search.html" }
        ],
        practice: [
          { site: "CSES", name: "Subordinates", url: "https://cses.fi/problemset/task/1674" },
          { site: "CSES", name: "Tree Diameter", url: "https://cses.fi/problemset/task/1131" },
          { site: "CSES", name: "Tree Distances I", url: "https://cses.fi/problemset/task/1132" },
          { site: "Codeforces", name: "580C. Kefa and Park", url: "https://codeforces.com/problemset/problem/580/C" },
          { site: "Codeforces", name: "115A. Party", url: "https://codeforces.com/problemset/problem/115/A" }
        ],
        doneWhen: "Given a tree with up to 200000 nodes, you can compute every subtree size and the diameter from memory.",
        mistake: "Recursing into the parent and looping forever, or adding a child's size before its DFS has finished.",
        tip: "A recursive DFS at n = 200000 can overflow the stack. Raise the limit or write the DFS with an explicit stack."
      }
    ]
  }
];

/* What to learn after the roadmap. --------------------------------------- */
const AFTER = {
  title: "After this roadmap",
  intro: "You can open most Div. 3 problems and name a technique. These four topics come next, in this order, and none of them is required before your first 50 contests.",
  items: [
    {
      title: "Range queries",
      text: "Fenwick tree, then segment tree: prefix sums that survive updates, and range minimum or range sum queries.",
      links: [
        { label: "Fenwick tree", url: "https://cp-algorithms.com/data_structures/fenwick.html" },
        { label: "Segment tree", url: "https://cp-algorithms.com/data_structures/segment_tree.html" }
      ]
    },
    {
      title: "Trees, deeper",
      text: "Binary lifting and LCA, Euler tours, and dynamic programming on trees.",
      links: [
        { label: "LCA with binary lifting", url: "https://cp-algorithms.com/graph/lca_binary_lifting.html" },
        { label: "DP on trees", url: "https://usaco.guide/gold/dp-trees" }
      ]
    },
    {
      title: "Strings",
      text: "Hashing and the prefix function cover nearly every string problem you will meet until suffix structures.",
      links: [
        { label: "String hashing", url: "https://cp-algorithms.com/string/string-hashing.html" },
        { label: "Prefix function (KMP)", url: "https://cp-algorithms.com/string/prefix-function.html" }
      ]
    },
    {
      title: "Harder DP",
      text: "Bitmask DP and digit DP: the two patterns behind most remaining dynamic programming problems.",
      links: [
        { label: "Bitmask DP", url: "https://usaco.guide/gold/dp-bitmasks" },
        { label: "Digit DP", url: "https://usaco.guide/gold/digit-dp" }
      ]
    }
  ],
  routine: "Keep the habit: two contests a week, upsolve every problem you miss, and stay with problems rated 1300 to 1600 until they feel routine."
};
