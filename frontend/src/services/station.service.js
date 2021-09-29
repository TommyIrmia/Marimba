import { asyncStorageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

export const stationService = {
    query,
    getGenres,
    getById,
    addStation,
    removeStation,
    addTrackToStation,
    removeTrackFromStation,
    saveEmptyStation,
    saveNewStation,
    saveDataFromHero
}

const STORAGE_KEY = 'station'
const genres = ['All', 'Hits', 'Happy', 'Pop']
const initialStations = [
    {
        "_id": "s101",
        "name": "All Time Hits",
        "description": "Hits from all of the best era's of music!!!",
        "tags": [
            "All",
            "Hits"
        ],
        "imgUrl": "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXGBgYGBgXGBgYFxoYFRgaFxcYHxkaHSggGholGxUVITEhJSkrLi4uGB8zODMtNygtLisBCgoKDg0OGxAQGy0lICUtLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAQIDBAYHBQj/xABHEAACAQICBggCBwYEBgEFAAABAgMAEQQhBQYHEjFBEyIyUWFxgZGhsRRCUmKSwdEjM1OCovBDcrLCFSRjg5Ph0iVEo8Px/8QAGgEAAwEBAQEAAAAAAAAAAAAAAgMEAQAFBv/EADwRAAEDAgQDBQUGBgIDAQAAAAEAAhEDIRIxQVEEYXETIoGRoTKxwdHwFCNCUrLhBTM0YnLxU5IkRHMV/9oADAMBAAIRAxEAPwCjy4o7xtLIuZyu3f5039PccJHJ7yzfrSZTvsQeNzY+vCoxFe21o1Vteq5jZpgYTqBF+kkNPQJ76XJ/Ef8AE360X0uT+I/4m/Wm0F8hTh3R94/CiMbKKnSxDETA3PuG55IfS5P4j/ib9aejxz36ztu+BINIR2I7YHgB+VLzPc/wNC6NQvT4ahUYMVJxjmBB6iZjwSJMY9zZ3t/mb9aJMTKTk7/ib9abkjtmOHypxZRu2zTyrdLKVtHFXPbGDn16TbxKflxzhmu7kH7xv73pUeOaxN3sPvsc/eoTxWNuN+FPRwm24RkefjQkNAVVF9d9ZwLd9AYJuBMWGo8EhMTKeDyH+Zv1oHFSfxH/ABN+tCFt0kHq3+FOqx3ipsWAyJoib5KalwbKjBcgyQbWB23vmLXyMJcWIktYyOL8Ls3H34UhcdILhnf8Te/GojtfjTgnPA2PnXYStFekSIluEQCRMjUOF/JSBjPvyn+c/rS58ZIRnI48N4/rUTpu4AeVFGlz8zWYdSmDiZBp0wDitYYR13PjYDNK+lyfxH/E361JixJ3b77kj77frUdrFTYcLedDDuAGvzrjcIeGYyjWAcWkEZnIZ5eIUiHGO2RL245ORa9MnFPewkfw6zfrQEqEHq2yt4U3hT1q4CJRVsFU02FwJJu4WOdhkDMZTqn58U46odyRxO8ePvRx4qRTdnf8R/WmBA9+zwo5pr5Wtnc+ddGgWHuuNV4LS32RBi2n+tbqS+KfIs7A8m3iV9RehJM5/wAR1P8Amax+NQ4pCPLu5U9E68jZfrIfyrC3Cq6fEUeIGF8dDGe868yIO4OSP6ZKp7b/AIj+tH/xOX7Te5/Wm4X3juHMcu8UywogAcxdee976TA6k84SYGUg6/sRn1KdOMk/iP8Aib9aNcdIM+kf8TfrUelKLm1EQIUlMvxgtzn1+K03pj978Zoqc3qFebDdl9D9id+cf9WrMZFu5/zfnR4h7uf74U6kZDkkGwJPzqKDXoi5Xiua6lw4BEFzp8G/uU8mSE8zl+tNAU9a6DzPxpMJswv31wOZR1GEuptyaQ2/U3+KXuBeLEHwpZPeb9z8waauAW3xnQT92fEi1CROaqp1cGJrABAcYvIjLFOp8E4kgLAfaFj58jUYi1LhHXXzFFN2m86ICCpq1R1egHuzxEDxCe3xYHna3/umFY8iaclw9gTfhx8KsWq+pWMxRV0iKx8ekkuqkd4uLt5gWoMTWgklHXfW7RjKvcFsvU21tHUaquSQnif1pceIAHW5dk1seg9kWHTrYmaSZuaraOP82PnceVXXReq+Dw/7nDRIe/dBb8RuT71M/i2RAEpba3ZPxUvGb62PXXqvNeD0XPLbo4ZXvzSN2H9INdRNTccw6uExH80ZW/4rV6XCCgRSzxzjoElpaBBaDzK8yyam6QGZwc/ol/gL1FxOiMTGnXw86Z570Ui+ua8K9SURWs+2uOYC6m7ACBqIXk7DG5K94I9aN8K4F7V6fx+gMLP++gik8WRSfe16p+mNk2EkBMDyQMfHpE/C2fswpg40E3EJ9N1F1PBVBkTBB3vfxWFUKt+ntnGOw123BNH9uK5sO8p2h8R41VujUcZB6C9WNqNcJBSKXDVKgkC3UD3lCObKxzHxp1xcdbrD7Q4jzpoRJyceuVDcdM//AGKyxyXo06lZjcNUYm5SIdHUDMdQOSJ4rEXzXvpzFMDa1vS/ClRkEELkx5fVvTccGeeSjjXdVhpEMwUAC1+uceJ01vcJUXUG9zOQ/Wk4fIFu7h5mkSy3Pypzc6qr3m9bpfVBTeHVIp3DAY5uNp6kmegROCxHeR+Zo44rXa4IAOY8qQ0mdxy4elFLMSCPlXQYgLG1uGa9z3AlwNudoHrmtBv40KVbwoVN3foKTHW39CqFiMRmwA4k8786ZihJ8B3mnXiFySRa5yF7+VNSy38ByWqR/aqqgM4+KMnRoPvIsBOychFiVP8AZ5Utl7Vxx7Q5jxFM4rtN/fKlpN9q/gRxrCDmE+lXpscaD7QTBOWoj98kbMQL3Vx386YkcnjUreU8Sp8wb02Nwfe9wKxpGy3i6JeBFUYdb/7JQgG6C59K6GrGr+Ixku5Am9Y9djkic7s35cfCu7qPqTLpBxJJePDKc25uR9VPzbl48t10ToyLDRLFCgRF4AfEk8ye851PX4kMkC59AoalVstbS9ltxOp1Py5Kqap7OMNhbPL+3mvcs46in7qZj1Nz5VeQtRpcWiFVZlUubKCQCxsTYDmbAnKpN689z3OMlJc4uMkrm6T03h8Pbp5o4ySAAzAMSchZeJrpA1jW3TRAEkGKA7YML+a3ZP6ek9q0TUTSxxOBgkbt7u4/fvx9Vj62v60ZpQwPGqwSZKsVUHaJiNKJJD/w9XKbr9JuqjDeuu7fezGV+FX6mcU1kY9yk+woGOwmYlcRIWFaO180vOQsDdK26XIWJGbdBAJtbhdl962LVeed8JC+JUrMVvICu4Q1z9XlyrIdhIvi28MM/wAZIf8A3W6Na2dP4qA7CALJlWMUjUA+iziHa9hhI6SwyKquyh0IcFVYgMRkRcC9her3ofScWJiWaElo3vukgrexIORAPEGsK0bhP+J6YLsLxSTM7DviiuFGXeqIvrW76OwceHiSKMbsaAKozyA8TWV2MZGGZQua4G4iVLIqq6zaj4bFgtbopT/ioBcn7w4P65+IrhaC16bFaXOHjYfRejdUyF2dLHpAeNj1gB3AGtIFKc19M81zHuYZaYK83a1as4nAtaeMSRk2WVew3h91vun0JrhIvOM+amvU+MwqSo0ciq6MCGVgCpB5EGsR2g7PHwZOIwt2g4suZaL/AOUfjxHO/GraHEB3ddY+hVVPjHSO0uN/xDofgVQmQNmMrcR+YpsuTxNSGbLpBx5imsQtjlwOY9asbzXcXShuNuucZEHJ0aZQRoeqQqkmwp/EPYbo42sTS7bgCrxPE0mSJb23s8vKhLpN1Szhn0qLhTPfMAkwAJuGg6n/AFuotKDWzpzDKN4gjPO3nQLKeIK+VGXaKCnwxwh+IAyYBkZZ6ZytG6fw+NCmqFRwE37XxP8AyBZ3L2m8z86QaVL2m8z86TVy84GFIePezU38OdRzSo4y3AGpROVpLH50ExbNekKQ4gF5BYd/wnzuFDq47O9SWx8u/ICuGQ9c8C7fw1PzPIeJy4mq2gJMbiUgjyvm7WvuIO03xAHeSK9KaI0bHhoUhiXdRFAA+ZJ5knMnvNT8VXwDCM/cvPaJUjC4dI0VEUKqgBVAsABwAFPGq3rPrjhsC8a4guOkuRuqWsq2uxtyuQMrmpmh9ZcJiv3GIjkPHdDWceaGzD2rzMLoxRZMWXbW9CzR4hcajybpI3TvE9FItiAt+yptvC2VwfCtF1F1mXH4ZZchIvVlXucDM/5TxHn4V0tM6LjxMLwSi6OpBtxHcw7iDmKwTR+kcVobGSpZSwUqwa4jdeMcmR4cxnzIvVLR2zMI9oZdET3ghtojPnt6LadftFjEYGZQt3UdInfvR9Ye4BHrWS7PdefoUU0bRtIHYSJYgKptZ7k8AQE4A86t2zRtJzzvi8SW6CVSLSdW9jdDHGB1VGYvzB58asWi9nuAhYuIOkYkm8h3wLkmwXsgC9hlyrgW0wWPv0WsfkHXbnHOErZ9rU2kIZJGjEZWQqAL7pUgFSCeOZYHyqyaQUmNwBclWsPHdNqciiAAAAAHAAWHtThqZxBNghJvKyPY/qzi8LiZHxEDRKYd0Fipu2+hsN0nkpqx7SdZpcJGqRxlhKkgZ8wIxYAEEC29duB7qvNqQ8YPEX86Y6rifjcFtNwaQSJA0WKbGZ4xi3LX3nj3IQASAq9aQk8slT+7VZdr2tfQRDCQtaWVbuRxSI5ehbMDwB8KuuG0Fho5emjgjSXdK7yrumxsSMsuQqj6Q2atLpH6RJMZYXYu4cdcW4RiwsU4DkQBzOdMFRjqmNyY94q1MUxOZ+XwCzrVnF/QtIYaae8aABmNiepJGwDWW5PavwvWg6W2xYdbjDwySnkz2jT2zb3Ap/aHqrg95sfiZJAkcaoIoyq77Lvbq3IJud4Cwtw41QNQNUjjMUN8WgjO/IBcjvWK/j77oPeKf91VHaOmwQPx1XOeBbXlYR5rZ9TNJ4nE4ZZ8RGkbOSVVb9j6pNyczn6WNd5luLEXB76j4vGRQRF5GWONBmSQAAP74VWNVNoGHx2IkgQFCucZbLpVHaIHIjjY52se+0OEulwFkJcCbKi7Q9RforNicOv/AC79tB/hMTkR/wBM39DlwItnD9lPX4GvVuIhWRSjgMrAhgcwQciDXnXaDqycDiAguYWBMTHPK+aE/aW48wQedW8NWxHC7NUjiAKBZtl/2B+Cr2M7V/ajdbv4WFz6U2JTa2RHjTmLkN936o/SrYNgmuq0nNfVk3LTEfizzyjnt1TJfO/jelYocxwIv+tIRbmwpzEvlujgPnzrTmFO04qFQv1Ij/Ll4TPgtDoUXtQpOIKHGzYeqoE8YJYrfIm9/PjSMOLsKMSbrk+J+dOxJZ7jhYkUzIL1KFMVnsewQQRiHuPTQ80xJITzpxlReObc+QFN4XtDzqzagavfSsdGjZoh6WQct1CLKf8AMxUW7r1j3Nbc7LGlxpOrxiMxe4GtgdT81q+y7VoYXCiR13ZpwrP3que4noDc+JPdV3olFKrxnEuMlSOcXGSqVtS1d+l4JigvLD+0TvIHbT1Xh4qKxrQWgFxMMkiTpFLCC5WTJWTLrK4zUjhYg8RnnXpluFec9o2gjgcY4QWimvLH3C566581a/oVqzhahg055j4jyW08AdL5jl9eic0LrZpSNv8Al3lkTeCBWQypvN2VucwT3BhWyw6vpiDBiMbDE2KjSx3QejDGxIAJO9YjIm9je1StVtGQ4fCxRwoVTdDdYWcswBLN94867VJq1Q490R8VzzieXblJC0qhUXG42OFGkldUReLMQAPU0hCpVCsz05tcwyErhonxDcN4no4z5Egsfw1Wcftcxt/2ccCd4Ku9vXeHyp7eGqu0RBhLS/QLcqFYNBtex4PWTDuO7cdT77/5VZNDbYomIGJw7xffjPSL5kEBh6b1a7hardEvEFqtCudorS0OIQSQSLIh5qb59xHEHwNdGpyiVV111VXHxIpdkaMlk5pvEW6y8/MWIz7yKgRS4XQmCVZXu5uSFtvzSntED7PLPIACrzVI2kanDHQ78YAxEdyh+0vExk9x4g8j5mmscDDXmy0udhwjefFZLrNrTiMexklyiU9SFewpINrn6zmxzPcbWzrrYrVgphsNj8DK8xuu+UW0kcu9YFVW5sG6pU39Qa6ezueHERTaIni47zBguYZTdt42ydWFwx7t3z0bU/VaLR8JijZmLHed2+s1gL7vBRYAWHxqmpVDLN000IhVPrGl922IGeuI8/2U/QU0rwRtPH0cpUb6g3s3P/8AnK9c3XvVxcdhHiy6QdeJjykUG3oQSD5+FWWiNRAwZCkN8l5Q+ikGxBBBIYHipU2IPiLWpmRrkmr3th0H9HxnTJlHiAWNuAkWwf3uG8yaoqQk+XjXs034mh+6a49o0U6TTOZ8oty6p3D8DmAfGmzEo4v7CkyREU23CjzuD9QjfWwAMey7ZzJ15ZTzWk5eNCioVLh5lT9r/aPJUGSDM5gXJ4+dGsLAWDC3nSMY13bzI9qaRLm1UwSFWH0W1CxjDtIcRPwvcoSRlTnW37GNGBcK+JK2aZ7A/ci6o/qL1iOIfie78q9N6Dwi4TBRRnIRRDe8wu8x97mpOMccAGpSXuDS9lP2Z15a9M1wcVtBjj0g2CaJ2AZEEiEH9o9uqVNsusouCeeWVXYNWE7OcO2L0sJ36wXpMR4BibKPd7/y11trOnJVxsSQyvEII99mRivWlN7G3HqouRy61TuojGGN2umHh3GoKbRf6v0WxVzNK6FgxDwtNGHML9JHfk1rcOY4G3eoPIVzotLthtHpiMWxLLHG0lgoYs9hawsL3YCpmgNYcPjE38PKHAtvDMMt+G8pAI4HztU8OF/VTkELsWo6K9Rsfi1hjaWQ7qICzHwArFi4+t2s8WCi35CS7HdjjHadvyUcSeXnYVgmsmnsTpCe8jM53rRxLcqvKyoOLePE1I03paXH4ozMrbxO7EncpNkQAc8xc8yaveDwmG0DhhPMomx0oIVQeH3V+ygv1n4n2FX0wKQylxyVFej2VMYokmegXJ1e2YS7nS4yRcMvEjIuB4k9VD71Lk0Xq5BlJM8zDiQ8zZ/9qy+lUrWHWGfGOHxEhKHggyjQ+CjL1Nz41xZISPLvpzWPeZc4zysiq0XtpiRIG0QJ15zvdacmE1amNld4mPMtiFH9d0HwpGktmIaMy6PmjnHEKxW58A46pPnbzrNcNlduQHxNSdDaZnwsnSYeRo25gHqt4MpyYedd2Lx7Lj43S2uNFrXCxdOgy0N/FTYcZjcBPvKXhlXtKRYGx7LLwZT7cx31tmomusekEIPUnQdeO+RH2071v6j2JreBx2G05AYntDjY1urD/UPtR3yK8R7Gs1VptHYom5TEQt/L6/aRgfUGlOaKwLSIcEb2iocWK4zkyPA5mdl6foiK5OrWmUxmGjxCcHGYyurDJlPiDcV1d6oCIMFTKJhtHRRvJJHGiPIQ0jKoBcgWBJ55Cplc3TWmoMLEZZ5BGgyubkk2uAFGbHI5CoGr+sUePw8kmGZkszxgsBvKwUFW3cxwZWz9e6uwkiVysG9VD0xtGSHHrguif94qSSOQoG+BYqBfeHWXM251RdnuncSNKr9JlkdpN+B99rgNxAA4DrJawA4+NTdt2C6PEw4hRYyoVLdzREWPnZx+GqW0AKmB15FkQbBGOw+verttV0V0+j5GCgvARMt/u5Sf0F/UCvP0jk8a9NaAxQxeBhdrETQqH82Xdce+9Xm7FaPMckkbZdG7ISfuMV/KncG7NpRMbWqDs6eW2Q8T801BmCnhf2qOeFSHkAFk4czzNMhb5VaN0ziMLsFNpki06GTYDcDJaNQp/ohQqeQt/wDzeJ/L6hZrIhLNYE5n50qPIE8+A9eNLeYZg7wsTw86bmlvbw7+NP7xWtFCkztGv70WHM26iJ3upOgsP0mKw8f254lPk0ig/AmvQ20DECPR2KN7XiZP/J1PfrVhez1L6SwgP8UH8Klh8QK2DbC1tFyj7Twj/wDIrflUfFCazW/WaiZa6ruwzAW+lS3BB6JF9A7N/qT2qpaajbGaYdTcq+KEfhuI4Q2/lUmtA2Gx2wMrd87fBI/1rO9RT0mmoCfrTzP38Elf5iuafvKjtgndoySSCAcgCfInOFftuGN3MJDCDbpJbkfdjUm34ivtT+xrCCLRzzt/iSSOfBIhuW91c+tcTbc+9Nhov+m7epZR/tNWPR69Fq8Qpsfokhv3NKrG/u9Jdag1u5RGg7C1+hkeK5my/XLGY3EyxylGiCtIG3bOu843EBGTLYkZi/V4mlbb9MmPDxYZTYzMWa32IrG3q7L57pqNsMwW6MXJzJiTyCh2Pvvj2FV/bTMz6QVBwSFB5Fmdj8N32o2sb9ojQfAIDTqB2CO8E/sg0UrSS46Y/s8MCFJ4Byt2b+VP9Yqm60adfG4mTEPwY2RfsxjsL7ZnxJNaBhgcPq2xvYzOQxHdJNuevUW3rWYmRRwF/En8qopd6o58awEXZF16j43mSfK59fBFhd5mCIpYsQAoFyxOQAHM1pmhNkbuofEuISf8NOuw824A+AB86VsU0QskkuKdReOyR5cCwuzedrC/ia2MCkcRXcHYW2TDUfT7gMjmFkWmtkD7t8Pid4gZJIoUH+ZeHqDWW6QwMkEjRSoUkU2ZTxH6jxGRr1gazHbXoVGgjxXB42CMbZlH4D0a3uazh+JdiDXapDsVR8k3O/1ZY/ozSEmHlSaI7siMGU8rjke9SMiOYJrS9puDjxeEw2lIsgVVZP8AK3Zv4q91/mrMLoO8/AVp+pznEaCx8LZ9H0pTwtGsqj8YPvVFcwWvGh9Cj7NtLMgnYXHmIR7EtNWlmwnBWXpUH3lIV/UhkP8AKasW1bWHEYOKJoGVBIWVm3buGABUAnICwe9xyrMNmGJ3NJ4Y/aLIfJkb87e1aftogVtHBm+pNGw8zvJ/vpFVgFcbFc2oS8VDF9xbbLkl62D6doMy/WMMc48Gjs7/AADj1qt7DMbaTEwb1wVSQd1wSrW78ivtVi2eN02hNxuG7iYz5F5LfBhVC2M3XSK3PbhkFvwtf+mhA+7qMOhXNYS12FsxrsP36KFrxG2G0xK6g9WVJlHnuyH+rerRNs8CvgI5ePRzI3o6snzZape2gEaR3V+th42NuNy0i/JRV715tJoIs38LDt3570f60Tj/AC3IhYtcySeeU7Dpql7HsVv6OVeccki+QLb4/wBdZPtIg6PSeKXlvqw7v2kaP82NaNsNYfRcQovYTg5+MaD/AGiqhtfhH/E3zsTHEfgV4/yitow3iHDqsNN73lgN9bwD7gqPHATmOFLUFQxPG1h5mjfIAODlwIpuea4sOAq27lU1tHh+/fGAIBzxcxAgDQyVoVqKlXoVPHJeVf8AMVQ2NgxsD1je/nSOmX+GPc0RkszcwSbj1oxh7i6nLxp8AZr1qb6lSmBQiQLthumokbZ8139n8q/8RwmVv2vf3qwrWdsC/wD0yQkXAeIn1kA+ZFYjq3P0eMwz/ZnhJ8ukXe+F63/aTBv6MxWV92Pf/wDGQ/8AtqPiBhqs+tVF2xe4F0W5CPECFwtiTg4GQC+U7fFI/wBKzrUKEx6Zw4IyEsy+F+ilUD3q57CsaCmKisAVaN//ACBl/wD1/EVTnl+iaaYN2Vxl/JZJLg/hcGtaDjqN3CP7pxdj8CMp6bH0Vj23xnpsOw+tGwv4KwP+6rHF1tXDum+7gmz8Y0N/iprmbdcGTBh5gD1ZGQ+Add4el47eoro7JplxGijAc9xpoW8n6/taX50p38lrhoVjq2JrW/lXM2Ey/ssUp478bfiUrf8Ao+FV3bHCw0gTeytDG1+XFl/212tkGFxEWKxKtDIIt3o98iyb8L2ABPaPWbhfhUnbdoy8cWItkpMbfzdZD5XDD1FGHRxE7ptPAKxAcYveSJtuNCVz5l6XVgbuZicXt3LiP/iwNZajZ99abshxqTRYrRspylVnTyK7kgHiOoQPOqHpLRDYeWSOXtRtYgcxybyIsR4Gn0nBjnMO8+aTRpPrPmnAi/TnuYWobFNJKRNAcmJWVR3iwRreW6v4q1YV5Z0RpKSKdJ4m3HjzBHC1s1I5g8CK1vQe13Cug+lK8Li1yqtIhPeN27DyI96mr8O7FLRKZxLsb+0GR9YAkxpdaWaznbbpFUwSw/WmkWw+7Gd8t5XCj+alaU2uYFEJh6Sd+Q3GjX1aQAgeQNZDrHpufGzNiJjc9lVHZReSgd3jxJrOHoPxBzrAKeC6wErk1qez/wDZaF0jK2Qbpd3xtCq/NrVmn0csVEali5CqozJYmwXzJrVNewMFouDR6sOlks0ljyU78h8jJYeQNV8QQ4NbufcmDh3NcWxLrRGRHyVM2dje0lhVUZb5Y99kRm/KtS2xOo0cVJtvSxgehLH1sp9qqGxTRW/ipZ7XWJNy/Lfk7vJVb8QrubboZXhgVI3ZFdpHYAlQQpVQbcO21IqEHiANoTHY31RMGNBl0/0ujs1ITQwfgtsS3oruD/pNZ5sYjJ0kh+zDIT7Kv+6tD0qPoOr5Q5EYYR/9yeyH+qQ/GqrsKwV58RNbJI1QHxka5+CD3FC0/d1HbqdxLnfUKJtlkvpDdDboXDx7x/nlNvj8au2t69HoLd4EQ4dRfwaP9KzraPL9I0rLGOTRxDxayi34mIrQdsThNHLFe2/LGnogL/7APWscB921WOlzabW38foADfW52UTYaxOHxJb+MB7RqT8xVN2ym+k28Ioh/qP5ir/sYw4XR5cAgSTSN57to7/0VmW1GQvpPEtxAZEHhuRoCPfeplEzxLj1U1UPeXH2ouTM/W2irMUvI5r8vGkzJa4/u1Ip2TOPyy9Gq2IMomu7WmWuuWiR0GY8loNCjoVNKl7Pms6l7TeZ+dOhQwAvYjv50qfDHebgczw86JYBmDxtfyqguG69Chwtdri1zLHOTnrAO6Q0LjgCDyI7+Rr07hJFxmDUnszw5jwkSxHxNeY8O/EXtfnW6bHdJ9JgeiJBaB2Xje6N11PuWH8tR8a04Qdkp1OmaYfTnnJFvj45Ki7H8WcPpJsO+RkR4iP+pEd4D+mSi21aO6LHCbgs0YN/vx9Vvhue9WfHbP8AENpU4uF0ii6RJt49Y72W+oUEcbHiR2q0bE6OikZHkjR2jJKFlBKk8SL8DlS3V2tqCoL2ukFhAhVnF4A6V0SiNeOSWOJrsp6siEEmxztdWHiD41K1H1QTR0bqsjyNIVLlrBbqLdVRw48yTVoAo6lxnDh0zhdGqTu1ztP6JTFYeTDydmRSL8weKsPEEA+ldOhQi2S1eYPo2IwGLzIjmgfI8jbnbmjKT6NWkaW0fDpvDfScKUTFou66E8bZ7jeBN91/Md9rBtC1IXHoHQhMQnZbky59RvDuPLyJrGcPJPgMSQheDERm1mGRHcRwZT7HiK9AP7UBwMOCpptxAdmAD/kZNtJylc+bByQu8UqNHIozVhYjP4jLiMjUMVquF19wONQR6TwwVxkJFBZfMW68fkLjxohqLoeY3g0lu890yRNYHhkwDW86cK+D+Y0j1CndJY0AezI9VllPYMEuFUFixsFUEsxPIAZk1ph2faKi62I0mLeDwpf0O8adOuGidHAjR+H6aW1ukNwPWR+sR4KLeVceIDrMBPohpuNNwcNE5qpq3HouI47HkBx+6jyJUkGwA5ykZeAv42zrT2lJsfijKVLPIQkca52W9kjHfxPqSaGnNOYnHzBpSZHJ3Y40B3Rf6qIL5+5PpWtbNNn/ANE/5nE2OII6q5ERA8c+bnv5DIcSaAnsQXvMuK5zi8/VhsrNqRq8MDhEh4v2pGHORuPoMlHgBXeZL8RTlCvNJJMnNaq/rfq2uPw/QNI8Y3gwKW4re1wRmud7ZcBnXO1I1b/4ZhZQ79Ixd5WZQc1VQFAHHgl7Z5sauNJIrcZw4dFy876gQNjdLRyNn+0fEP4bp3rfjZBVl27aRu+HgByUPI3m1lT4B/etWg0XCkrTLGiysN1nCgMwvexI451nWsmomKxGkhOzJJh5JE3rGzRpGOyQeIIUi4PFuFVCs11QONgAipNYZD9j5q56l4H6No/DRsLFYgz+DP13/qZq88aUxpmlxEx/xJC4/mckD2IFb7tF0oMPo6ZgbF16JfOTqkjyUsfSvPFt6yqMhx/Wj4QTid9bp3DMNyMyIA1MiPADO/wTSqTfwpa/u2/l/OnCR1mHZ4Cm3Fo7d+ftwq2Z+vFG2gKQJme66ec2EdVoVCnOiNHU0BI7F/5Ss9xozvzz+eVNQPYtzuLeNPNKpY3XiTnegQ0YNuZ4+AqibQr8AfU7dj+6M4uRaLiw72+UpmWG2fI1b9k+nBhscqMbR4gCJv8ANf8AZH8RK/z1TGYnib07hnUcbg8iOIPf51z24mFpUIbSq14Z3W8/ox+69ZCjqsah6f8ApmFVyR0q2SUffA7Vu5hY+p7qswrxSCDBQPaWOLXZhHQoUKxChUZcUhcx7y74AYrcbwU3ANuNsjn4VG07pWPCwPPIbKgv4k8Ao8SbD1rznjtYJZMU2LDMJ2a4ZSQV5Kq2+qBYW58/F1KgaswmsphwJc4ADf5BenRXF1i1bw+NXdnjDEdlxk6/5WGY8uBprQmLmiwUcuPdVkCBpTbdC34AgZbwBANuJvauxhsQrqGRgynMMDcEd4POleybJYkXCx3T2yGcEthZUkX7Ml0YeRAKt/TVXn1F0ivVfCSZcCu64/pJyr0iBQtVDeLqBE2oQ4uN5z2K8zwajaRY2XBS+oVB7sQKs2htkOLkIOIkjgXuX9o/lYWUe5rcrUda7jKhFrJWEKt6r6m4XBC8KXfgZXzkPeL/AFR4C1WSiJqg7SddGwgWCC3TOu8WOYjS9g1ubEg28jSAHVHblNp0y9wa1XvfFLBrzVg9F47STM0aSYkqetJK/VUnPi7ADyHDuAr0Zgm6igkbwUA2N8wBeiq08BiZW1GNbYOnopVCiBo6UloURNHXI1l0ymEw0k78FGQ5sxyVR4k/nXAE5LllO2rTfS4iPCJmIeu4/wCo4yHoh/rrPnvzsi9wpWNnMsjyvJd3Yux3TxY3PkM8hyGVMXQd7eeQr2KbMLA0K+i3smnEQJ/uEel/AETqldrwQf3701PJe59qWLv4Aewoiu6cxTBmgrF1VoIswkS6NdOjRoN1on98aFK6b+8qFRYnbIey4f8A5fQfJZvL2m8z86DuSADyoS9pvM/OlwgAFrXtarzoVNRa55LAYBF+gv4pmhTz2K7wFuRpqtBlDWpGm6M5uCNQfoq06ja1tg8SrkExOAsqjM7t8nA71JJ8iRzr0Rh5ldQysGVgCCMwQcwa8qYc9Ru/q1omynXfoCMJiH/Yn927f4ZY9kn7BPsT3cIOKoTLm6ZqmqHPDXuJLnCeUC0eQW3URolNN4mLeRluy7ykXXJhcWuDyNeep1ie1nWP6TMMLG/UiJuBweXgc+5cwPEt4VQdF44wTJMgUtGwYBxvLcZi49vhV905svxkcqpA/SwuwXpDYPGDxLrzAHNePcKsW0XRGAwmjo42iBkUCOAjKQtxZiRxXixvlc95FekysxrQwXlNqtpPwtpi+v1eTn6QLKna66/yY+GKFYzEAd6UA3DOvZAPHcHGx527q7WxmLFmdyJWGFQHfQ2ZWdh1QAeyRfeJFuV73qhaPwMs0iQxgK0jBVXmedz4AXJ8q9F6saDjweGjgj+qLsx4s7Zsx8z7Cw5UFdzGMwNCbWoii2CSSfAeWfmAq3rxr42AxKQrEsimMSOSxUjeZlFsjfsHLyrqaja3jSKSOsLRdGVU3YMCWBORHdl7isf2sYzpNJzjlGI4x6IGP9TkeladsfwYTAlrfvJXPooCfNTSqlJraIdF0rC11PEBlAPMnbpCiaT2u4SMlY4p5GBI7KoARkQd43+FcDGbX5mBKYeOMcizM7H0G6B8ad0jsjllxE0n0iOON5ZHUBGdrMxYA5qAc/GsxlJUXI663WxzAK5H406nSoO9m5tuj4RrSXOfFhInLmTFzG2+dlqmzzXjF4nGiLEuNyRH3EVVUBls17gb3ZDcTXN2yaHk+kiax6N0UBuQZbgqe64sQTxue6tD1W1XwEaRYmCBQ7Irq5JZxvryLE2yNsqsssKsLMAQeIIBBqbtWtqYmCFjazWvkC0QeY+C8p4XFS2McckgDZlEZrMeFyqnP2qXoLGSYd+mjdo2BuCMrn7w4MOVjV71112xGExU+Fw0WGhRSAHSK0lmRWve+7e7H6vdVf1T1Sn0i6tZkgv13PCw4hD9Zjw8OJq/HLcThAK3hezZie+5GTTkdL9JyC3zQmMM2HimIsZI1cjuLKCRU+mcLCqIqKLKoCgdwXID2FOk15KQY0QJrA9petQxuIEMbf8ALwk7pHB5OBfxAFwPAk86tG07Xa18Fh26xDCZ1+r/ANNT9rvPLhx4ZBhbXF8gKu4aj+M+CfRp/eUy6IJgzyTsaIDxub2tUdxmafaG5ve4Y8uVqRNLew+J41c03VHFsaKeHCGgE4Yvi96Ifuz4m1HjeO79kWp1eqoJ471wtRJDe5rm3MrOLPZUBT1IbI2AvfqfctGvQo70KnxLzZH5lncvabzPzpcXZcf5TSJe03mfnS8L2rd4Iqp2SfwZ++A3keYhHhrG4PC1/alRIr5DI/MUjDNZh7U7CgRhdrHupZOa9LhG9oymHNBaCQ6Ykai5RwSC5UC3L86Yw/G3flSxEQ/Dn8KbkPWNu+iEeiXXe8BjqggteRtI5LSNnW0YwbuGxhvEOqkp4xjgFbvTx5eXDaIpQwDKQQcwQbgg8CDXk+cdY+/vVr1J13mwI3bmSC+cRPZvxKH6vlw+dR1+GnvMUApONQsGk/P3L0TVO141JGOAdZWjmQEIeKEE3IK8rnmM/O1dPVvWrDY1bwyXYDrRtlIvmvd4i4rvXqEFzHWsVjXOYZBgrN9mOoz4RpJ8SB0xuiAHeCoDmwPe3yHia0Ym1KpLpcEd9c95eZch1XmDTkplxc0pGTzSMD93eO78AK9BajYbo8BhlOR6JWPnJ1z8Wqv4zZPgn3ujaaIm/B98Z+Dg/Or1h4QihRwUADyAsKfXrB4AGioqOpCmG0pzkz5eScavM+uOF6HH4qIjq9M7DwEh6QW9HAr01VN05s6wmLxLYmYyFmCgqrbq9QboOQvwA58qHh6rabiXZJDXOacTfrkeSc2X4zpdG4fO+4Gj/wDGxUf0gVbq5eg9Bw4SLosOm4ly1t5mzNgTdiTyFdSlOILiQuJkyuTidXcJJJ00mGgeX7bRoXyyHWIvwrpRqBkMgMgKXeuXpvT2HwiF55Ag5Dix8AozNYATZcASYC6ZNqyjaJtJC72GwTXfsvMDkveqd7fe5cs+Ff1y2gzY0NFATDDzHCRx3MRwH3R6k1RoEt1iOHAeNW0OGjvP8lQOEqFzQcjec7eCdY9b/KnxNQxT8psLczmfyFMVewQt/iFTE8N2uep+QCWrkXtzpyDIFvQedMU7EwsVOV+fjXOFkvhah7QAnIHDOQOnkniB0YLknrcvGmJ47DI3BFPLD1SLjiDvXypnEuCLDgBQt2Ct4wTRDqjQDAjeZg31+s1oVCjoVMvJg/X+1nUvabzPzolNjepUwDlrZPc5d+fzqJVYM2TKtI0iHAyND6xyPIqWygMWPp5kUzCN5s/M0uZrxr6/CkCWwsOfGhaDHovQ4h9IVQ3Joh8fmcb/AOkJJSSczamqFGqEmwo4AC8x7qlZ25OnMpybkfD5ZUMOc7Hgcv0oYnkO4UcYsN4+g7/HyrPwq2D9qJH4fa2iIP7JMMjIwZWZGU5MpKsD3gjMVoGrm1nFQ2XEqMQn2sllHqBut6gHxrPGa+dFQvpNeO8FA4iThy+C9FaD2iYDE2Am6J/sTDcOfLe7BPkxq1RzKwupBHeMxXlBYHPL8q6GC0nLAOpO8ZHDo3ZT8DY+tRP4MT3CrqXCvc0l3dsTJyPx9F6jvQvXnHCbRdJx/wD3RYdzpG3xK73xrqQbVtJd0DW74yPk9LPB1Bt5qVgLzDRJW9XoXrBRtY0k2QGHH/bP5vUXG7QNItxxfR35Rxxj4lSfjWfZX6wn0uHqVWl7Rbc2HqvQTSAC5OVVvTOvWAw2UmIVm+xHeRr/AMtwvqRXn/Smk8TLnNiJZQftSMV/Dew9qgSSlrX5U5nBSe8Ut7ezlr5DrQN/rSJndaZp3a1NL1MJH0I/iSbrSDyUXVT+Ks80ppCSZy0kjyE8WclmPqeA8BlUeFuIPMWpS4Y8+HfVTKTKeQTqbXupBtIXcTi5bDkDmiw4zvwA4/pT2IksfHl3KP1pJtxOSDgOZpmRrm9FGIyVS6r9l4fsm5kz8zGl8raTzTnQeI3jnamCKF6flzG/z5/rRSRmoy2nWaezEOF85kanqCmKMCioUSjEap+NbLJf7tNmI7t7G1HJMTkaJpjxvyoRiVzn8O6GnFAEDIG5kz0m260O9Cl9IaFSXU3Z0vzen7rO5YyGOR4n50s9b/MOPjSZJjvHrHifnS1lewO9xNhlVRmLq/huxdLBiLTmIB8cxqkQuLbrcPlThwy/xBbyNNYntmmq6JuEs12U5pvYH4bA3BgE7KRaMcyfeifEHgBb50wamTTkW4Xt6g1hbHNOo1g+m8/ywInC3MHnnPRR3j3DmKceRD1rH4fOhIu8LjkM6j1o72aVWceHJawAsdcYu9PP5zron1kX7NvG9NmLrbp76SR31JhYGxJzT491dktpf+QQypAIIOQFtR5XCbxbdc0zRsbm9FRNsFHxFXtKrn7lOwx348Bxp6KS98rJwpo/u/WjxHBRytQG5XpUH/Z2Ym6AE88RsP8AEDMBOO+71R1bHh3io7vyGQve1OL1ltzHZ8QeVHHEMr5hsvI1wgZrqxq1y0Uz3CPLcWtY2Pgd0mA5MOVr+opkVInfLd4ngT+VR6Ju6j4sBuGmDJaPoeCFGrEcKMqRxpNEpu8w7FGzE8aKlxR3NOXThmPHOskCwTmUH1BjLgJNsRzPJM05h2zt35GiliI/WkKbG9dmFjMVCs3HaCJ87p5ljvbrfOi6JeT+4oYpc78jnQjUDrEi3dzNDpMqxwmsaZpttrdtt7HKNkPo55EH1onwzWOVKtZT3t8qJv3WXIn410n66LnUeHgy0ghuKx55XEzF1oW4e6hR599Cp7qbs6fPzHyWeL2z5n51In/eJQoU53tBXcF/JPVv6lDk7RpNChTQvM4j+c7qfelL+YpeJ7R9aKhQHMJv/pv/AMm/BScR2RUKhQrmaqz+Ke1T6KdpD6vrUA0KFFTUv8V/rD4fpR0KFCtUI0Tg7Hr+VLm7C/zUKFAMx1Xpv/kv/wDm39Sbg7Y86mQ8Jf75UKFC/NXfwv2fF/6Vz1o2oUKaMl89p5+9TdI/VqFR0KGn7K9H+K/1j/D9LU/h+D+VRuVChRN1S639PT6O/UpmH/dH++dREo6FDSTuPyo/4BPx/uj51HFChWMyQcZ7LP8AFqkY/t+gok/dt5ChQrPwDr806p/XVejv0LQKFChUy89f/9k=",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [
            {
                "_id": "u103",
                "fullname": "Tommy Irmia",
                "imgUrl": "someimg"
            }, {
                "_id": "u102",
                "fullname": "Tomer Morad",
                "imgUrl": "someimg"
            }, {
                "_id": "u101",
                "fullname": "Naama Arkin",
                "imgUrl": "someimg"
            }
        ],
        "tracks": [
            {
                "id": "A_MjCqQoLLA",
                "title": "Hey Jude - Beatels",
                "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg",
                "addedBy": {
                    "_id": "u101",
                    "fullname": "Naama Arkin",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '8:10',
                "minutes": 8,
                "seconds": 10
            },
            {
                "id": "m2uTFF_3MaA",
                "title": "Yellow Submarine - Beatels",
                "imgUrl": "https://i.ytimg.com/vi/mUkfiLjooxs/mqdefault.jpg",
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '2:46',
                "minutes": 2,
                "seconds": 46
            },
            {
                "id": 'kTJczUoc26U',
                "title": 'The Kid LAROI, Justin Bieber - STAY (Official Video)',
                "imgUrl": 'https://i.ytimg.com/vi/kTJczUoc26U/mqdefault.jpg',
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '2:38',
                "minutes": 2,
                "seconds": 38
            },
            {
                "id": "tQ0yjYUFKAE",
                "title": "Justin Bieber - Peaches ft. Daniel Caesar, Giveon",
                "imgUrl": "https://i.ytimg.com/vi/tQ0yjYUFKAE/mqdefault.jpg",
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '3:18',
                "minutes": 3,
                "seconds": 18
            },
            {
                "id": 'kffacxfA7G4',
                "title": 'Justin Bieber - Baby (Official Music Video) ft. Ludacris',
                "imgUrl": 'https://i.ytimg.com/vi/kffacxfA7G4/mqdefault.jpg',
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '3:40',
                "minutes": 3,
                "seconds": 40
            }
        ]
    },
    {
        "_id": "s102",
        "name": "Ariana's HITS!",
        "description": "Ariana Grande's best songs!",
        "tags": [
            "All",
            "Hits",
            "Happy",
            "Pop"
        ],
        "imgUrl": "data:image/jpeg;base64,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",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Naama Arkin",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [
            {
                "_id": "u103",
                "fullname": "Tommy Irmia",
                "imgUrl": "someimg"
            }, {
                "_id": "u102",
                "fullname": "Tomer Morad",
                "imgUrl": "someimg"
            }, {
                "_id": "u101",
                "fullname": "Naama Arkin",
                "imgUrl": "someimg"
            },
            {
                "_id": "u103",
                "fullname": "Tommy Irmia",
                "imgUrl": "someimg"
            }, {
                "_id": "u102",
                "fullname": "Tomer Morad",
                "imgUrl": "someimg"
            }, {
                "_id": "u101",
                "fullname": "Naama Arkin",
                "imgUrl": "someimg"
            }
        ],
        "tracks": [
            {
                "id": "tcYodQoapMg",
                "title": "Ariana Grander - Positions",
                "imgUrl": "https://i.scdn.co/image/ab6761610000e5ebcdce7620dc940db079bf4952",
                "addedBy": {
                    "_id": "u101",
                    "fullname": "Naama Arkin",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '2:57',
                "minutes": 2,
                "seconds": 57
            },
            {
                "id": "QYh6mYIJG2Y",
                "title": "Ariana Grande - 7 rings (Official Video)",
                "imgUrl": "https://assets.teenvogue.com/photos/613b5fd248eda7f19679403c/16:9/w_2560%2Cc_limit/1235152164",
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1604110465663,
                "isPlaying": false,
                "duration": '3:04',
                "minutes": 3,
                "seconds": 4
            },
            {
                "id": 'gl1aHhXnN1k',
                "title": 'Ariana Grande - thank u, next (Official Video)',
                "imgUrl": 'https://middleeast-grlk5lagedl.stackpathdns.com/production/middleeast/images/1549442654887145-ariana-grande-bstg-2018-billboard-u-1548.jpg?w=1920&h=800&fit=clip&crop=faces&auto=%5B%22format%22%2C%20%22compress%22%5D&cs=srgb',
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1600110465663,
                "isPlaying": false,
                "duration": '5:30',
                "minutes": 5,
                "seconds": 30
            },
            {
                "id": "kHLHSlExFis",
                "title": "Ariana Grande - God is a woman (Official Video)",
                "imgUrl": "https://pbs.twimg.com/media/E-7sHGjVUAA43bo.jpg:large",
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '4:01',
                "minutes": 4,
                "seconds": 1
            },
            {
                "id": 'ffxKSjUwKdU',
                "title": 'Ariana Grande - no tears left to cry (Official Video)',
                "imgUrl": 'data:image/jpeg;base64,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',
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '3:58',
                "minutes": 3,
                "seconds": 58
            }
        ]
    },
    {
        "_id": "s103",
        "name": "Best of Lizzo!",
        "description": "Lizzo's most fun tracks, good for hyping a party up!!!",
        "tags": [
            "All",
            "Hits",
            "Happy",
            "Pop"
        ],
        "imgUrl": "https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg",
        "createdAt": 1541652422,
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [
            {
                "_id": "u103",
                "fullname": "Tommy Irmia",
                "imgUrl": "someimg"
            }, {
                "_id": "u102",
                "fullname": "Tomer Morad",
                "imgUrl": "someimg"
            }, {
                "_id": "u101",
                "fullname": "Naama Arkin",
                "imgUrl": "someimg"
            }, {
                "_id": "u102",
                "fullname": "Tomer Morad",
                "imgUrl": "someimg"
            }, {
                "_id": "u101",
                "fullname": "Naama Arkin",
                "imgUrl": "someimg"
            }
        ],
        "tracks": [
            {
                "id": "XaCrQL_8eMY",
                "title": "Lizzo - Juice (Official Video)",
                "imgUrl": "https://i.ytimg.com/vi/XaCrQL_8eMY/mqdefault.jpg",
                "addedBy": {
                    "_id": "u101",
                    "fullname": "Naama Arkin",
                    "imgUrl": "someimg"
                },
                "addedAt": 1603110465663,
                "isPlaying": false,
                "duration": '3:20',
                "minutes": 3,
                "seconds": 20
            },
            {
                "id": "HQliEKPg1Qk",
                "title": "Lizzo - Boys (Official Video)",
                "imgUrl": "https://4.bp.blogspot.com/-fSJj8tID6e4/WzKl9H_rfVI/AAAAAAAARYs/Oq4TQvTjo1wo7zDoyr8Zkk8zQnp4APKJgCLcBGAs/w1200-h630-p-k-no-nu/lizzo.jpg",
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1577110465663,
                "isPlaying": false,
                "duration": '2:59',
                "minutes": 2,
                "seconds": 59
            },
            {
                "id": 'P00HMxdsVZI',
                "title": 'Lizzo - Truth Hurts (Official Video)',
                "imgUrl": 'data:image/jpeg;base64,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',
                "addedBy": {
                    "_id": "u102",
                    "fullname": "Tomer Morad",
                    "imgUrl": "someimg"
                },
                "addedAt": 1527110465663,
                "isPlaying": false,
                "duration": '3:01',
                "minutes": 3,
                "seconds": 1
            },
            {
                "id": "4P9XUrniiK4",
                "title": "Lizzo - Rumors feat. Cardi B [Official Video",
                "imgUrl": "data:image/jpeg;base64,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",
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '3:06',
                "minutes": 3,
                "seconds": 6
            },
            {
                "id": 'SmbmeOgWsqE',
                "title": 'Lizzo - Good As Hell (Video)',
                "imgUrl": 'data:image/jpeg;base64,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',
                "addedBy": {
                    "_id": "u103",
                    "fullname": "Tommy Irmia",
                    "imgUrl": "someimg"
                },
                "addedAt": 1607110465663,
                "isPlaying": false,
                "duration": '2:45',
                "minutes": 2,
                "seconds": 45
            }
        ]
    },

]

async function query(byGenre) {
    try {
        let stations = await asyncStorageService.query(STORAGE_KEY)
        if (!stations) {
            stations = initialStations
            _saveStationsToStorage()
        }
        const stationsByGenre = stations.filter(station => station.tags.includes(byGenre))
        return stationsByGenre
    } catch (err) {
        console.log('Can not get stations', err)
    }
}

async function removeStation(stationId) {
    try {
        return await asyncStorageService.remove(STORAGE_KEY, stationId)
    } catch (err) {
        console.log('Can not remove station', err)
    }
}

async function addStation(station) {
    try {
        return await stationService.post(STORAGE_KEY, station)
    }
    catch (err) {
        console.log('Can not add station', err)
    }
}

async function saveEmptyStation() {
    const newStation = [{
        "_id": 'new',
        "name": "New Station",
        "description": "What's the best way to describe your station?",
        "tags": ["Happy"],
        "imgUrl": "",
        "createdAt": Date.now(),
        "createdBy": {
            "_id": "u101",
            "fullname": "Puki Ben David",
            "imgUrl": "https://i.ytimg.com/vi/4_iC0MyIykM/mqdefault.jpg"
        },
        "likedByUsers": [],
        "tracks": []
    }]
    asyncStorageService.save('newStation', newStation);
}

async function getById(stationId) {
    try {
        return await asyncStorageService.get(STORAGE_KEY, stationId)
    } catch (err) {
        console.log('Can not get station', stationId)
    }
}

async function addTrackToStation(track, stationId) {
    try {
        const station = await asyncStorageService.get(STORAGE_KEY, stationId)
        station.tracks.push(track)
        return await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        console.log('Can not add track to station', err)
    }
}

async function removeTrackFromStation(trackId, stationId) {
    try {
        const station = await asyncStorageService.get(STORAGE_KEY, stationId)
        const idx = station.tracks.findIndex(track => track.id === trackId)
        station.tracks.splice(idx, 1)
        return await asyncStorageService.put(STORAGE_KEY, station)
    } catch (err) {
        console.log('Can not remove track from station', err)
    }
}

async function saveNewStation() {
    const id = utilService.makeId();
    let newStation = await asyncStorageService.get('newStation', 'new');
    newStation._id = id;
    await asyncStorageService.post(STORAGE_KEY, newStation);
    return id;
}

async function saveDataFromHero(stationId, data) {
    console.log('from save data', stationId);
    const station = await getById(stationId)
    console.log('from save data', station);
    const updatedStation = {
        ...station,
        name: data.title,
        imgUrl: data.img,
        description: data.desc
    }
    await asyncStorageService.put(STORAGE_KEY, updatedStation)
}

async function getGenres() {
    try {
        return Promise.resolve(genres)
    } catch (err) {
        console.log('Can not get genres', err)
    }
    //change to async (return Promise)
}

function _saveStationsToStorage() {
    asyncStorageService.save(STORAGE_KEY, initialStations)
}