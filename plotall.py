import sys
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

file = sys.argv[1]
print file

data = pd.read_csv(file)
velocities = data['Velocity'].tolist()
signals = data['Signal'].tolist()

plt.scatter(velocities, signals);
plt.plot(velocities, signals);
plt.savefig(file + '.png')


# N = 50
# x = np.random.rand(N)
# y = np.random.rand(N)
# colors = np.random.rand(N)
# area = np.pi * (15 * np.random.rand(N))**2  # 0 to 15 point radiuses

# plt.scatter(x, y, s=area, c=colors, alpha=0.5)
# plt.show()